const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const session = require("express-session");
const bodyParser = require("body-parser");
const mysqlSession = require("express-mysql-session");

// const passportLocal = require("passport-local");
// const passport = require("passport");
// const passportMySQL = require("passport-mysql");

//
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// let store = {
//     host: '127.0.0.1',
//     port: 3306,
//     user: 'root',
//     database: 'cookie_db'};
app.use(
    session({
            secret: "my new secret",
            resave: false,
            saveUninitialized: false,
        })
);

app.use(passport.initialize());
app.use(passport.session());


const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "data"
});

const customFields = {
    usernameField: "email",
    passwordField: "password"
};


const verifyCallback = (email, password, done) => {
    db.query(
        "SELECT * FROM users WHERE email = ?", [email],
        (err, results, fields) => {
            if (err) {
                return done(err);
            }
            if (results.length === 0) {
                return done(null, false, { message: "Incorrect email." });
            }
            bcrypt.compare(password, results[0].password, (err, isMatch) => {
                if (err) {
                    return done(err);
                }
                if (!isMatch) {
                    return done(null, false, { message: "Incorrect password." });
                }
                return done(null, results[0]);
            });
        });
};

const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);



app.post("/check", (req, res) => {
    const { username } = req.body;
    db.query(`SELECT * FROM users WHERE username = '${username}'`, (err, result) => {
        if(err) {
            console.log(err);
        }
        else {
            if(result.length > 0) {
                res.send("username already exists");
            }
            else {
                res.send("username available");
            }
        }
    });
});

app.post("/create", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    var duplicateUsername = false;
    const password = req.body.password;
    console.log(name, password);
    
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            
            if (result.length > 0) {
                res.send("User already exists");
            }
            else {
    
                var encryptedPassword = "";
                //encrypt password
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        console.log(err);
                    } else {
                        encryptedPassword = hash;
                        console.log(hash);
                        db.query("INSERT INTO users (name, username, email ,password) values (?,?,?,?);", [name, username, email, hash], (err, result) => {

                            if (err) {
                                console.log(err);
                                res.send("error");
                            }
                            else {
                                res.send("success");
                            }
                        });
                    }
                });
                console.log(encryptedPassword, name, email, username);
                
            }
        }
    });
}); 

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

function checkAuth() {
    return function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/login");
    };
}

app.get("/", checkAuth, (req, res) => {
    res.send("Welcome to the homepage!");
});

app.get("/login", (req, res) => {
    res.send("Welcome to the login page!");
});

app.get("/logout", (req, res) => {
    res.send("Welcome to the logout page!");
});
//
// app.get("/profile", checkAuth, (req, res) => {
//     res.send("Welcome to the profile page!");
// });
//
// app.get("/admin", checkAuth, (req, res) => {
//     res.send("Welcome to the admin page!");
// });
//
// app.get("/users", checkAuth, (req, res) => {
//     res.send("Welcome to the users page!");
// });

// app.post("/register", (req, res) => {
//     const { username, password } = req.body;
//     db.query(`SELECT * FROM users WHERE username = '${username}'`, (err, result) => {
//         if(err) {
//             console.log(err);
//         }
//         else {
//             if(result.length > 0) {
//                 res.send("username already exists");
//             }
//             else {
//                 db.query("INSERT INTO users (username, password) values (?,?);", [username, password], (err, result) => {
//                     if (err) {
//                         console.log(err);
//                         res.send("error");
//                     }
//                     else {
//                         res.send("success");
//                     }
//                 });
//             }
//         }
//     });
// });
//
app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // console.log(email, bpassword);
    
    db.query("SELECT password FROM users WHERE email = ?;", [email], (err, result) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else {
            if (result.length > 0) {
                console.log(result);
                bcrypt.compare(password, result[0].password, (err, isMatch) => {
                    if (err) {
                        console.log(err);
                        res.send("error");
                    }
                    if (!isMatch) {
                        res.send("Incorrect password");
                    }
                    else {
                        res.send("success");
                    }
                });
            }
            else {
                res.send("User does not exist");
            }
        }
    });
});



app.get("/user/name/:username", (req, res) => {
    console.log(req.params.username);
   db.query("SELECT name FROM users WHERE username = ?;", [req.params.username], (err, result) => {
         if(err) {
              console.log(err);
         }
         else {
             console.log(result);
              res.send(result[0].name);
         }
    });
});

app.get("/user/username/:email", (req, res) => {
    if (req.params.email !== "") {
        db.query("SELECT username FROM users WHERE email = ?;", [req.params.email], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result[0].username);
            }
        });
    }
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
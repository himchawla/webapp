const express = require("express");
const mysql = require("mysql");

const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const universalCookie = require("universal-cookie");
const {JSONCookies} = require("cookie-parser");
const cookie = new universalCookie();

app.use(
    session({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            expires: 60 * 60 * 24,
            sameSite: "strict",
            path: "/",
        },
    })
);
// app.use(universalCookie());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "data",
    multipleStatements: true
});

const cookieDB = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "cookie_db",
});


//
app.get("/user/verify", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

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
                        //send cookie to the client

                        res.cookie("userId", result[0].id, {
                            maxAge: 1000 * 60 * 60 * 24,
                            httpOnly: false,
                            sameSite: "strict",
                            secure: false,
                            path: "/",
                        });

                        req.session.user = email;
                        req.session.cookie.expires = new Date(Date.now() + 3600000);
                        req.session.save();
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
             if(result.length > 0) {

             console.log(result);
              res.send(result[0].name);
             }
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
//
//
// app.get("/user/verify", (req, res) => {
//
//
//             cookieDB.query("SELECT * FROM cookies WHERE cookie_id = ?;", [req.query.id], (err, result) => {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     if (result.length > 0) {
//                         res.send("success");
//                     }
//                     else {
//                         res.send("fail");
//                     }
//                 }
//             });
//
// });


app.listen(3001, () => {
  console.log("Server started on port 3001");
  cookieDB.query("CREATE TABLE IF NOT EXISTS cookies (cookie_id INT AUTO_INCREMENT PRIMARY KEY, cookie_name VARCHAR(255), cookie_value VARCHAR(255), cookie_expiry DATETIME, cookie_path VARCHAR(255), cookie_domain VARCHAR(255), cookie_secure BOOLEAN, cookie_httponly BOOLEAN, cookie_samesite VARCHAR(255));", (err, result) => {
      if(err) {
          console.log(err);
      }
      else {
          console.log("cookie table created");
      }
  });

});
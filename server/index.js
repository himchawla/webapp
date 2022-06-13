const express = require("express");
const mysql = require("mysql");
const fileUpload = require("express-fileupload");

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
app.use(fileUpload());

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


// //
// app.get("/user/verify", (req, res) => {
//     if (req.session.user) {
//         res.send({ loggedIn: true, user: req.session.user });
//     } else {
//         res.send({ loggedIn: false });
//     }
// });

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

app.post("/create/userDetails/", (req, res) => {
    const { username, description, numOfSkills} = req.body;
    //console.log(username, userDetails);
    db.query(`INSERT INTO userDetails (username, description, numberOfSkills) values (?,?,?);`, [username, description, numOfSkills], (err, result) => {
        if (err) {
            console.log(err);
            res.send("error");
        }
        else {
            res.send("success");
        }
    });
    console.log("Username:",  username, "Description:", description, "NumOfSkills:", numOfSkills);

});

app.post("/create/addSkill/", (req, res) => {
    const {username, skillName, skillProficiency} = req.body;

    db.query(`INSERT INTO userSkills (username, skillName, skillProficiency)
              values (?, ?, ?);`, [username, skillName, skillProficiency], (err, result) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else {
            res.send("success");
        }
    })
    console.log("Username:", username, "SkillName:", skillName, "SkillProficiency:", skillProficiency);

});

app.post("/user/auth",  (req, res) => {

        const token = req.body.token;
        const sessionToken = token;
        cookieDB.query(`SELECT * FROM cookie_db.cookies WHERE token = '${sessionToken}'`, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                if (result.length > 0) {
                    res.send({ msg: "success" });
                } else {
                    res.send("error");
                    //res.redirect("/login");
                }
            }
        });
});

app.post("/user/logout", (req, res) => {
    const token = req.body.token;
    const sessionToken = token;
    cookieDB.query(`DELETE FROM cookie_db.cookies WHERE token = '${sessionToken}'`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("success");
        }
    });
});

app.post("/user/getDescription", (req, res) => {
    const username = req.body.username;
    db.query(`SELECT * FROM userDetails WHERE username = '${username}'`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length > 0) {
                result[0].username = username;
                res.send(result[0]);
            }
            else {
                res.send("error");
            }
        }
    });
});

app.post("/user/getSpecialSkills", (req, res) => {
    const username = req.body.username;
    const skillId = req.body.skillId;
    db.query(`SELECT *
              FROM userSpecialSkills
              WHERE username = '${username}'
                AND skillId = '${skillId}'`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length >= 1) {
                res.send(result[0]);
            } else {
                res.send("error");
            }
        }
    });
});

app.post("/user/getProject", (req, res) => {
    const username = req.body.username;
    const projectId = req.body.projectId;
    db.query(`SELECT * FROM userProjects WHERE username = '${username}' AND projectId = '${projectId}'`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length >= 1) {
                res.send(result[0]);
            } else {
                res.send("error");
            }
        }
    });
});

app.post("/user/getProjectCount", (req, res) => {

    const username = req.body.username;
    db.query(`SELECT * FROM userProjects WHERE username = '${username}'`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
                res.send(result.length.toString());
        }
    });
});

app.post("/user/getAllProjectCount", (req, res) => {
    const username = req.body.username;
    //db query where username != username and publicProject = 1
    
    db.query(`SELECT * FROM userProjects WHERE username != '${username}'  AND publicProject = 1`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            result.count = result.length;
            res.send(result);
        }
    });
});

app.post("/user/getMainProject", (req, res) => {
    const username = req.body.username;
    db.query(`SELECT * FROM userProjects WHERE username = '${username}' AND mainProject = 1`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length >= 1) {
                res.send(result[0]);
            } else {
                res.send("error");
            }
        }
    });
});

app.post("/user/addProject", (req, res) => {
    const {
        username,
        projectName,
        projectShortDescription,
        projectLongDescription,
        projectMain,
        projectPublic,
        // projectImage
    } = req.body;
    
    const projectImage = req.files.projectImage;
    
    console.log(req.files.projectImage);

    const mainProject = projectMain === "true" ? 1 : 0;
    const publicProject = projectPublic === "true" ? 1 : 0;
    //db query select all projects and arrange them by projectId
    db.query('SELECT * FROM userProjects WHERE username = ?', [username], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length >= 1) {

                let projectId = result[result.length - 1].projectID + 1;
                //if the project is main project, set all other projects to not main project
                if (mainProject === 1) {
                    db.query(`UPDATE userProjects
                              SET mainProject = 0
                              WHERE username = '${username}'`, (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Main project updated");
                            db.query(`INSERT INTO userProjects (username, projectID, projectName,
                                                                projectShortDescription,
                                                                projectLongDescription, mainProject, publicProject, image)
                                      values (?, ?, ?, ?, ?, ?, ?, ?);`,
                                [username, projectId, projectName, projectShortDescription, projectLongDescription, mainProject, publicProject, projectImage.data], (err, result) => {
                                    if (err) {
                                        console.log(err);
                                        res.send("error");
                                    } else {
                                        console.log(projectImage);
                                        res.send("success");
                                    }
                                });
                        }
                    });
                } else {
                    db.query(`INSERT INTO userProjects (username, projectID, projectName, projectShortDescription,
                                                        projectLongDescription, mainProject, publicProject, image)
                              values (?, ?, ?, ?, ?, ?, ?, ?);`,
                        [username, projectId, projectName, projectShortDescription, projectLongDescription, mainProject, publicProject, projectImage.data], (err, result) => {
                            if (err) {
                                console.log(err);
                                res.send("error");

                            } else {
                                console.log(projectImage);
                                res.send("success");
                            }
                        });
                }

                // db.query('SELECT * FROM userProjects WHERE username = ? SORT_DIRECTION ', [username], (err, result) => {


                console.log("Username:", username, "ProjectName:", projectName, "ProjectShortDescription:", projectShortDescription, "ProjectLongDescription:", projectLongDescription, "MainProject:", mainProject, "PublicProject:", publicProject);
            }
            else {
                db.query(`INSERT INTO userProjects (username, projectID, projectName, projectShortDescription,
                                                        projectLongDescription, mainProject, publicProject)
                              values (?, ?, ?, ?, ?, ?, ?);`,
                    [username, 0, projectName, projectShortDescription, projectLongDescription, 1, publicProject], (err, result) => {
                        if (err) {
                            console.log(err);
                            res.send("error");
                        } else {
                            res.send("success");
                        }
                    });            }
        }
    });
});

app.post("/user/editProject", (req, res) => {
    const {
        username,
        projectId,
        projectName,
        projectShortDescription,
        projectLongDescription,
        projectMain,
        projectPublic
    } = req.body;
    
    
    const mainProject = projectMain === "true" ? 1 : 0;
    
    const publicProject = projectPublic === "true" ? 1 : 0;
    
    const projectImage = req.files != null ? req.files.projectImage : null;
    
    if(projectImage != null) {
        db.query(`UPDATE userProjects
                  SET projectName = ?,
                      projectShortDescription = ?,
                      projectLongDescription = ?,
                      mainProject = ?,
                      publicProject = ?,
                      image = ?
                  WHERE username = ?
                    AND projectID = ?`,
            [projectName, projectShortDescription, projectLongDescription, mainProject, publicProject, projectImage.data, username, projectId], (err, result) => {
                if (err) {
                    console.log(err);
                    res.send("error");
                } else {
                    res.send("success");
                }
            });
    }
    else {
        db.query(`UPDATE userProjects
                  SET projectName             = ?,
                      projectShortDescription = ?,
                      projectLongDescription  = ?,
                      mainProject             = ?,
                      publicProject           = ?
                  WHERE username = ?
                    AND projectID = ?`,
            [projectName, projectShortDescription, projectLongDescription, mainProject, publicProject, username, projectId], (err, result) => {
                if (err) {
                    console.log(err);
                    res.send("error");
                } else {
                    res.send("success");
                }
            });
    }
});

app.post("/user/deleteProject", (req, res) => {
    const {
        username,
        projectId
    } = req.body;
    db.query(`DELETE FROM userProjects WHERE username = '${username}' AND projectID = ${projectId}`, (err, result) => {
        if (err) {
            console.log(err);
            // res.send("error");
        } else {
            // res.send("success");
        }
    });
    
    db.query(`UPDATE userProjects
                SET projectID = projectID - 1
                WHERE username = '${username}'
                    AND projectID > ${projectId}`, (err, result) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else {
            res.send("success");
        }
    });
    
});

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
                        var token = req.body.token;
                        bcrypt.hash(token, 10, (err, hash) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(hash);
                                res.token = hash;
                                cookieDB.query("INSERT INTO cookies (token) values (?);", [res.token], (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log(result);
                                    }
                                });
                                req.session.user = email;
                                req.session.cookie.expires = new Date(Date.now() + 3600000);
                                req.session.save();
                                res.send({"msg":"success", "cookie": res.token});
                            }
                        });

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


app.listen(3001, () => {
  console.log("Server started on port 3001");
  cookieDB.query("DROP TABLE IF EXISTS cookies;");
  cookieDB.query("CREATE TABLE IF NOT EXISTS cookies (token VARCHAR(100) PRIMARY KEY);", (err, result) => {
      if(err) {
          console.log(err);
      }
      else {
          console.log("cookie table created");
      }
  });

});
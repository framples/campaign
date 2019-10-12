let path = require("path");

module.exports = function (app) {

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    app.get("/information", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/information: "));
    });

    app.get("/charcreation", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/charactercreation.html"));
    });

    app.get("/dm", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/dmeyesonly.html"));
    });

    app.get("/login", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    app.get("/resources", function (req, res) {
        send.sendFile(path.join(__dirname, "../resources.html"));
    });

    /*app.get("/signup", function (req, res) {
        send.sendFile(path.join(__dirname, "../public/signup.html"));
    }); */

    ///////////////////TRIAL CODE///////////////////////////////


    app.use((req, res, next) => {
        if (req.cookies.user_sid && !req.session.user) {
            res.clearCookie('user_sid');        
        }
        next();
    });
    
    
    // middleware function to check for logged-in users
    var sessionChecker = (req, res, next) => {
        if (req.session.user && req.cookies.user_sid) {
            res.redirect('/dashboard');
        } else {
            next();
        }    
    };



    app.route("/signup")
        .get(sessionChecker, (req, res) => {
            res.sendFile(__dirname + "signup.html");
        })
        .post((req, res) => {
            URLSearchParams.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
                .then(user => {
                    req.session.user = user.dataValues;
                    res.redirect("home.html");
                })
                .catch(error => {
                    res.redirect("signup.html");
                });
        });

    app.route("/login")
        .get(sessionChecker, (req, res) => {
            res.sendFile(__dirname + "login.html");
        })
        .post((req, res) => {
            let username = req.body.username,
                password = req.body.password;

            User.findOne({ where: { username: username } }).then(function (user) {
                if (!user) {
                    res.redirect("login");
                } else if (!user.validPassword(password)) {
                    res.redirect("login");
                } else {
                    req.session.user = user.dataValues;
                    res.redirect("home");
                }
            });
        });

        app.get("/home", function (req,res) {
            if (req.session.user && req.cookies.user_sid) {
                res.sendFile(__dirname, "home.html");
            } else {
                res.redirect(".login");
            }
        });

        app.get("/logout", function (req, res) {
            if (req.session.user && req.cookies.user_sid) {
                res.clearCookie("user_sid");
                res.redirect("/");
            } else {
                res.redirect("/login");
            }
        })

        app.use(function (req, res, next) {
            res.status(404).send("Sorry");
        });

};
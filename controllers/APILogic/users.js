const db = require("../../models/User");
const uuidv4 = require("uuid/v4");
const bcrypt = require("bcrypt");
const saltRounds = 12;

module.exports = {
    auth: function (req, res) {
        db.User
            .findOne({
                username: req.body.username
            }).then((user) => {
                if (!user) {
                    return res.status(404).send("Username is not found.");
                }
                bcrypt.compare(req.body.password, user.password, function (err, response) {
                    if (err) {
                        return res.status(401).send("There was a problem verifying your password");
                    }

                    if (response) {
                        const token = uuidv4();

                        db.User.updateOne({
                            username: req.body.username
                        }, {
                            currentToken: token
                        }).then(res.json({ currentToken: token, firstName: user.firstName, lastName: user.lastName })
                        ).catch(error => res.status(400).send("Uh oh - there was a problem signing you in.  Please try again!"));
                    }
                });
            }).catch(err => res.status(400).send("Uh oh - there was a problem signing you in.  Please try again!"));
    },
    create: function (req, res) {
        db.User
            .findOne({
                username: req.body.user
            }).then((user) => {
                if (user) {
                    return res.status(406).send("Username already exists!");
                }
                bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                    if (err) {
                        return res.status(400).send("There was an error - text Pete if things are not working");
                    }
                    db.User
                        .create({
                            ...req.body,
                            password: hash
                        })
                        .then(dbModel => res.json(dbModel))
                        .catch(error => res.status(400).send("There was a problem creating your username"))
                });
            }).catch(error => res.status(400).send("We've had a problem with your sign up request - please try again."))
    }
}

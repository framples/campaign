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

    app.get("/signup", function (req, res) {
        send.sendFile(path.join(__dirname, "../public/signup.html"));
    }); 

};
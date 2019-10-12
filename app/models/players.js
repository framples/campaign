let Sequelize = require("sequelize");

let db = require("../config/connection.js");

let Player = db.define("player", {

    routeName: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING
});

Player.sync();

module.exports = Player;
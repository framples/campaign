let Sequelize = require("sequelize");

let db = require("../config/connection.js");

let Character = db.define("character", {

    routeName: Sequelize.STRING,
    firstName: Sequelize.STRING,
    lastnName: Sequelize.STRING,
    mainClass: Sequelize.STRING,
    secondClass: Sequelize.STRING,
    mainLevel: Sequelize.INTEGER,
    secondLevel: Sequelize.INTEGER,
    alignment: Sequelize.STRING,
    feat: Sequelize.STRING


}, {
    freezeTableName: true
});

Character.sync();

module.exports = Character;
let Sequelize = require("sequelize");

let db = require("../config/connection.js");

let Feedback = db.define("feedback", {

    routeName: Sequelize.STRING,
    errors: Sequelize.INTEGER,
    functionality: Sequelize.INTEGER,
    asthetics: Sequelize.INTEGER,
    easeOfUse: Sequelize.INTEGER,
    helpful: Sequelize.INTEGER

}, {
    freezeTableName: true
});

Feedback.sync();

module.exports = Feedback;
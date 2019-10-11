let Sequelize = require("sequelize");

let db = new Sequelize("sequelize_libary", "root", "Blitzcrank13", {
    host: "localhost",
    port: "3306",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});


db.
authenticate()
.then(() => {
    console.log("Connection has been established succesfully.");
})
.catch(err => {
    console.error("Unable to connectoin to the database.", err);
});

module.exports = db;


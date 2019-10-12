let Sequelize = require("sequelize");
let bcrypt = require("bcrypt");

let db = require("../config/connection.js");

let User = db.define("user", {

    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
},

    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
        }
    },
    instanceMethods: {
        validPassword: function(password) {
            return bcrypt.compareSync(password, this.password);
        }
    }
});




User.sync();

module.exports = User;
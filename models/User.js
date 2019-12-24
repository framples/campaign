const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        minLength: [4, "Must have a longer username!"] 
    },
    firstname: {
        type: String
    }, 
    email: {
        type: String,
        required: true
    },

    lastname: {
        type: String, 
    },
    password: {
        type: String,
        required: true
    }, 
    date: {
        type: Date,
        default: Date.now
    }, 
    characters: [
        {
            type:Schema.Types.ObjectId,
            ref: "Char"
        }
    ]
});

module.exports = User = mongoose.model('User', userSchema)
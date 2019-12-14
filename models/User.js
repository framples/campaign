const mongoose = require("mongoose");
const Schema = mongoose.Schema

const CharacterSchema = new Schema({
    character_name: {
        type: String,
        required: true
    },
    character_class: {
        type: String,
        required: true
    }, 
    character_level: {
        type: String
    },
    character_background: {
        type: String
    }, 
    character_alignment: {
        type: String
    }
})

module.exports = User = mongoose.model('characters', CharacterSchema)
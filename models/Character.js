const mongoose = require("mongoose");
const Schema = mongoose.Schema

const characterSchema = new Schema({
    character_name: {
        type: String,
        required: true,
        unique: true
    },

    character_apperance: {
        type:String,
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
    },
    character_race: {
        type:String
    },
    character_maxhp: {
        type: Number
    },
    character_movementspeed: {
        type: Number
    },
    character_skillproficiency: {
        type: String
    },

    character_languages: {
        type: String
    },
    character_equipment: {
        type: String
    },
    str_score: {
        type: Number,
        min: 0,
        max: 20
    },
    dex_score: {
        type: Number,
        min: 0,
        max: 20,
    },
    con_score: {
        type: Number,
        min: 0,
        max: 20
    },
    int_score: {
        type: Number,
        min: 0,
        max: 20
    },
    wis_score: {
        type: Number,
        min: 0,
        max: 20
    },
    cha_score: {
        type: Number,
        min: 0,
        max: 20
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = Character = mongoose.model('Character', characterSchema)
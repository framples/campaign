const mongoose = require("mongoose");
const Schema = mongoose.Schema

const npcSchema = new Schema({
    npc_name: {
        type: String,
        require: true
    },
    npc_appearance: {
        type: String
    }, 
    npc_class: {
        type: String,
        
    },
    npc_motive: {
        type: String,
    }, 
    npc_allegiances: {
        type: String    
    }, 
    npc_alignment: {
        type: String
    },

    npc_zone: {
        type: String
    },

    npc_weapons: {
        type: String
    },

    npc_str_score: {
        type: Number,
        min: 0,
        max: 20
    },
    npc_dex_score: {
        type: Number,
        min: 0,
        max: 20
    },
    npc_con_score: {
        type: Number,
        min: 0,
        max: 20
    },
    npc_int_score: {
        type: Number,
        min: 0,
        max: 20
    },
    npc_wis_score: {
        type: Number,
        min: 0,
        max: 20
    },
    npc_cha_score: {
        type: Number,
        min: 0,
        max: 20
    },
    specialablilities: {
        type: String
    }
})

module.exports = Npc = mongoose.model('Npcs', npcSchema)
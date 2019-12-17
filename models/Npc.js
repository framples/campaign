const mongoose = require("mongoose");
const Schema = mongoose.Schema

const NpcSchema = new Schema({
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
        type: STring
    }
})

module.exports = Npcs = mongoose.model('npcs', NpcSchema)
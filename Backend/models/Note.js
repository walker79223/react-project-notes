const mongoose = require("mongoose")
const { Schema } = mongoose;

const noteSchema = new Schema({
    title : {
        type : String,
        min : 5
    },
    description : {
        type : String,
        min : 5
    },
    tag : {
        type : String,
        default : "general"
    },
    user : {
        type: mongoose.SchemaTypes.ObjectId,
        ref : "User"
    }
})

module.exports = mongoose.model("Note", noteSchema)
const mongoose = require('mongoose')

const sequelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' //this is model name
    }
},{
    timestamps: true
})

const Diary = mongoose.model('Diary', sequelSchema)

module.exports = Diary
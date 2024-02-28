const mongoose = require('mongoose')
const Schema = mongoose.Schema


const personalSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    gym: [{
        type: Schema.Types.ObjectId,
        ref: 'Gym',
        required: true
    }],
    imageUrl: {
        type: String,
        required: false
    },
    clients: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    role: { type: String, default: 'personal' }
})

module.exports = mongoose.model('Personal', personalSchema)
    
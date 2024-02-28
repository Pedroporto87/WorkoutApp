const mongoose = require('mongoose')
const bcrypt = require('bcrypt')



const Schema = mongoose.Schema

const  UserSchema = new Schema({
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
    imageUrl: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'personal', 'admin', 'gym'],
        default: 'user'
      },
      gym: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gym', 
        required: true
    }
})



module.exports = mongoose.model('User', UserSchema)
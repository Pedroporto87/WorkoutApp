const mongoose = require('mongoose')
const Schema = mongoose.Schema

const seriesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = mongoose.model('Serie', seriesSchema)

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const seriesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.ObjectId
    },
})

module.exports = mongoose.model('Serie', seriesSchema)

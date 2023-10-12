const mongoose = require('mongoose')
const { workoutSchema } = require('./workoutModel')
const Schema = mongoose.Schema

const seriesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    exercicios: [workoutSchema],
})

module.exports = mongoose.model('serie', seriesSchema)

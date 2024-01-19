const mongoose = require('mongoose')
const { workoutSchema } = require('./workoutModel')
const Schema = mongoose.Schema

const seriesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.ObjectId
    },
    workout: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout"
    }]
})

module.exports = mongoose.model('Serie', seriesSchema)

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    serieId: {
        type: Schema.Types.ObjectId,
        ref: 'Serie',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    reps: {
        type: String,
        required: true
    },
    series: {
        type: Number,
        required: true
    },
    carga: {
        type: String,
        required: true
    },
    descanso: {
        type: Number,
        required: true
    },
    order: {
        type: Number,
        required: true,
        default: 0 
    }
}, {timestamps: true})


module.exports = mongoose.model('Workout', workoutSchema)

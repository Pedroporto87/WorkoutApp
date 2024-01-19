const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
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
    series: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Serie"
     },
    
}, {timestamps: true})



/*const personalSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    alunos: [alunosSchema],
})*/



module.exports = mongoose.model('Workout', workoutSchema)

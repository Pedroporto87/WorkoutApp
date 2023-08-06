const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// pegando toda serie
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// pegando exercicio especifico
const getWorkout = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: 'exercicio não encontrado'})
    }

    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(404).json({msg: 'não existe o exercicio'})
    }
    res.status(200).json(workout)
}



// criando um novo exercicio

const createWorkout = async (req, res) => {
    const { title, reps, series, carga } = req.body

    //adicionando no DB
    try{
       const workout = await Workout.create({ title, reps, series, carga })
       res.status(200).json(workout)
    } catch(error) {
       res.status(400).json({msg: "error.message"})
    }
}

module.exports = {
    createWorkout, getWorkouts, getWorkout
}
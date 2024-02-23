const Workout = require('../models/workoutModel')
const Serie = require("../models/seriesModel")
const mongoose = require('mongoose')

// pegando toda serie
const getAllWorkouts = async (req, res) => {
    const id = req.params?.serieId;

    try {
        if (id) {
            const workouts = await Workout.find({ serieId: id }).sort({ createdAt: -1 });
            return res.json({ workouts });
        } else {
            return res.status(400).json({ msg: 'Problema ao encontrar o id da serie getAllWorkouts' });
        }
    } catch (error) {
        return res.status(400).json({ msg: 'Problema ao encontrar exercícios getAllWorkouts' });
    }
    // Removida a chamada redundante res.status(200).json(workouts)
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

    const id = req.params?.serieId
    const { title, reps, series, carga, descanso } = req.body
    const count = await Workout.countDocuments({ serieId: id });

    try {
        if(id){
            const createdWorkout = await Workout.create({
                serieId: id,
                title,
                reps,
                series,
                carga,
                descanso,
                order: count,
            })
            res.status(200).json(createdWorkout)
        }else{
            res.status(404).json({msg: 'não criou exercicio no else'})
        }
    } catch (error) {
        res.status(404).json({msg: 'não criou exercicio no catch1'})
    }
}

//deletando exercicio da serie

const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: 'exercicio não encontrado'})
    }

    const workout = await Workout.findByIdAndDelete({_id: id})
    
    if(!workout){
        return res.status(404).json({msg: 'não existe o exercicio'})
    }
    res.status(200).json(workout)
}

// alterando o exercicio

const updateWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: 'exercicio não encontrado'})
    }
    const workout = await Workout.findByIdAndUpdate({_id: id}, { ...req.body })
    if(!workout){
        return res.status(404).json({msg: 'não existe o exercicio'})
    }
    
    res.status(200).json(workout)
}

const updateOrder = async (req, res) => {
    const { orderedWorkouts } = req.body;
  try {
    await Promise.all(orderedWorkouts.map(workout => 
      Workout.updateOne({ _id: workout.id }, { $set: { order: workout.newOrder } })
    ));
    res.status(200).send({ message: 'Workouts updated successfully.' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to update workouts.' });
  }
};


module.exports = {
    createWorkout, getAllWorkouts, getWorkout, deleteWorkout, updateWorkout, updateOrder
}
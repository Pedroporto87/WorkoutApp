 const express = require('express')
 const Workout = require('../models/workoutModel')

 const router = express.Router()

 router.get("/", (req, res) => {
    res.json({msg: "Bora malhar!"})
 })
 router.get("/:id", (req, res) => {
    res.json({msg: 'Vamos treinar esse exercicio'})
 })
 router.post("/", async (req, res) => {
   const { title, reps, series, carga } = req.body
   try{
      const workout = await Workout.create({ title, reps, series, carga })
      res.status(200).json(workout)
   } catch(error) {
      res.status(400).json({msg: "error.message"})
   }
 })

 router.delete("/:id", (req, res) => {
    res.json({msg: 'Deleta exercicio'})
 })

 router.patch("/:id", (req, res) => {
    res.json({msg: 'Edita exercicio'})
 })

 module.exports = router
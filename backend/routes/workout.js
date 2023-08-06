 const express = require('express')
 const { createWorkout, getWorkouts,getWorkout } = require('../controllers/workoutControllers')
 

 const router = express.Router()

 router.get("/", getWorkouts)

 router.get("/:id", getWorkout)
 
 router.post("/", createWorkout)

 router.delete("/:id", (req, res) => {
    res.json({msg: 'Deleta exercicio'})
 })

 router.patch("/:id", (req, res) => {
    res.json({msg: 'Edita exercicio'})
 })

 module.exports = router
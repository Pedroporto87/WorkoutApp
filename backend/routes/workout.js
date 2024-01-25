 const express = require('express')
 const { createWorkout, 
         getWorkouts,
         getWorkout, 
         deleteWorkout, 
         updateWorkout } = require('../controllers/workoutControllers')
 const verifyToken = require("../helpers/check-token")
 

 const router = express.Router()

 router.get("/:serieId/", getWorkouts)

 router.get("/:serieI/:id", getWorkout)
 
 router.post("/:serieId/createworkout", createWorkout)

 router.delete("/:serieId/:id", deleteWorkout)

 router.patch("/:serieId/:id", updateWorkout)

 module.exports = router
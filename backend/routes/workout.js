 const express = require('express')
 const { createWorkout, 
         getWorkout,
         getAllWorkouts, 
         deleteWorkout, 
         updateWorkout } = require('../controllers/workoutControllers')
 
 

 const router = express.Router()

 router.get("/:serieId/get-all", getAllWorkouts)

 router.get("/:id", getWorkout)
 
 router.post("/:serieId/createworkout", createWorkout)

 router.delete("/:id", deleteWorkout)

 router.patch("/:id/", updateWorkout)

 module.exports = router
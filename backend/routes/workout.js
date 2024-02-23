 const express = require('express')
 const { createWorkout, 
         getWorkout,
         getAllWorkouts, 
         deleteWorkout, 
         updateWorkout, 
         updateOrder } = require('../controllers/workoutControllers')
const verifyJWT = require('../helpers/verifyJWT')

 const router = express.Router()

 router.use(verifyJWT)

 router.get("/:serieId/get-all", getAllWorkouts)

 router.get("/:id", getWorkout)
 
 router.post("/:serieId/createworkout", createWorkout)

 router.delete("/:id", deleteWorkout)

 router.patch("/:id/", updateWorkout)

 router.patch("/:serieId/update-order", updateOrder)

 module.exports = router
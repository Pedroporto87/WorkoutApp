const express = require('express')
const router = express.Router()
const usersController = require('../controllers/userControllers')
const verifyJWT = require('../helpers/verifyJWT')


router.get("/", verifyJWT, usersController.getAllUsers) 
router.post("/", usersController.createNewUser)
router.patch("/", verifyJWT, usersController.updateUser)
router.delete("/", verifyJWT, usersController.deleteUser)

module.exports = router
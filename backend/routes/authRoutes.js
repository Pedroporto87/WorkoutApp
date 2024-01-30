const express = require('express')
const { registerUser, loginUser, logoutUser, updateUserProfile, getUserProfile } = require("../controllers/authControllers");
const router = express.Router()
const protect  = require('../helpers/authMiddleware')

router.post('/register', registerUser )
router.post("/login", loginUser)
router.post('/logout', logoutUser)
router
    .route('/profile')
    .get(protect, getUserProfile)
    .patch(protect, updateUserProfile)

    
module.exports = router
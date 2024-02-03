require('dotenv').config()
const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const workingRoutes =  require('./routes/workout')
//const userRoutes =  require('./routes/user')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const serieRoutes = require('./routes/seriesRoutes')

const app = express()
app.use(cors({ 
    withCredentials : true }))
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())


app.use("/api/workouts", workingRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/series", serieRoutes)
//app.use("/api/user", userRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    app.listen(process.env.PORT, () => {
    console.log('escutando localhost', process.env.PORT)
})})
    .catch((erro) => {
        console.log({erro})})




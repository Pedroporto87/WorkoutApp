require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workingRoutes =  require('./routes/workout')

const app = express()

app.use(express.json())
app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})

app.use("/api/workouts", workingRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    app.listen(process.env.PORT, () => {
    console.log('escutando localhost', process.env.PORT)
})})
    .catch((erro) => {
        console.log({erro})})




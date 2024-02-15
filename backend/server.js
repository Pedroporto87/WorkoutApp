require('dotenv').config()
const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const path = require('path')
const workingRoutes =  require('./routes/workout')
const root = require('./routes/root')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const serieRoutes = require('./routes/seriesRoutes')
const { logger } = require('./utils/logger')
const corsOptions = require( './config/corsOptions')
const errorHandler = require('./utils/errorHandler')

const app = express()

app.use(logger)
app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', root)


app.use("/api/workouts", workingRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/series", serieRoutes)
//app.use("/api/user", userRoutes)
/*app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})*/

app.use(errorHandler)
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    app.listen(process.env.PORT, () => {
    console.log('escutando localhost', process.env.PORT)
})})
    .catch((erro) => {
        console.log({erro})})




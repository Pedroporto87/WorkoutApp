const router =  require('express').Router()
const verifyToken = require("../helpers/check-token")
const { getSeries, createSeries, getAllSeries } = require("../controllers/serieControllers")

router.get("/", verifyToken, getSeries)
router.post("/",verifyToken, createSeries)

module.exports = router
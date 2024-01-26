const router =  require('express').Router()
const verifyToken = require("../helpers/check-token")
const { getUserSeries, createSeries, getSeries, deleteSeries } = require("../controllers/serieControllers")

router.get("/userserie/:_id", verifyToken, getUserSeries)
router.post("/",verifyToken, createSeries)
router.get("/:_id", getSeries)
router.delete("/", verifyToken, deleteSeries)

module.exports = router
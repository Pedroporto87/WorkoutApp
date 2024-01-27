const router =  require('express').Router()
const verifyToken = require("../helpers/check-token")
const { getUserSeries, 
        createSeries,
        getSeries,
        deleteSeries,
        updateSeries } = require("../controllers/serieControllers")

router.get("/userserie/:_id", verifyToken, getUserSeries)
router.post("/",verifyToken, createSeries)
router.get("/:_id", getSeries)
router.delete("/", verifyToken, deleteSeries)
router.patch("/:id", verifyToken, updateSeries)

module.exports = router
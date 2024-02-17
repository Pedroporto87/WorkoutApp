const router =  require('express').Router()
const { getAllSeries, 
        getSeries,
        createNewSerie,
        updateSerie,
        deleteSerie} = require("../controllers/serieControllers")
const verifyJWT = require('../helpers/verifyJWT')

router.use(verifyJWT)

//router.get("/userserie/:_id", getUserSeries)
//router.get("/", getAllSeries)
router.post("/", createNewSerie)
router.get("/", getSeries)
router.delete("/:id", deleteSerie)
router.patch("/:id", updateSerie)

module.exports = router
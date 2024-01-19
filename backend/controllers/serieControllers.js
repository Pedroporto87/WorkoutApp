const jwt = require('jsonwebtoken')
const Serie = require("../models/seriesModel")
const User = require("../models/userModel")
const getUserByToken = require("../helpers/getUserByToken")

const getSeries = async (req, res) => {
    res.status(200).json({msg: "Funcionando!"})
}

const createSeries = async(req, res) => {

    const title = req.body.title

    if(title == null){
        res.status(400).json({ msg: "Dê nome a serie!"})
    }

    const token = req.header("auth-token")
    const userByToken = await getUserByToken(token)
    const userId = userByToken._id.toString()

    try {
        const user = await User.findOne({ _id: userId })
    } catch (error) {
        res.status(400).json({ msg: "Acesso negado createSeries"})
    }
    
    const serie = new Serie({
        title: title,
        userId: userId,
    });
    
    try {
        const newSerie = await serie.save()
        res.status(200).json({error: null, msg: "Serie criada com sucesso", data: newSerie})
        
    } catch (error) {
        res.status(400).json({msg: "Acesso negado createSeries2"})
    } 
}

const getAllSeries = async(req,res) => {

    try {
        
    } catch (error) {
        res.status(400).json({msg: "Acesso negado getAllSerie"})
    }
}

module.exports = { getSeries, createSeries, getAllSeries }
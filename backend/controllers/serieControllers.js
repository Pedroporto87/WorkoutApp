const jwt = require('jsonwebtoken')
const Serie = require("../models/seriesModel")
const User = require("../models/userModel")
const getUserByToken = require("../helpers/getUserByToken")
const mongoose = require('mongoose')

const getUserSeries = async (req, res) => {
    
    try {
        const token = req.header("auth-token")
        const user = await getUserByToken(token)
        const userId = user._id.toString()
        const serieId = req.params?._id
        const serie = await Serie.findOne({ _id: serieId, userId: userId})
        res.json({ error: null, serie: serie })

    } catch (error) {
        res.status(400).json({ msg: "Erro no getSeries"})
    }
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

const getSeries = async(req,res) => {
        const id = req.params._id
        const serieId = id.toString()
    try {
        
        const serie = await Serie.findById({ _id:serieId })
        res.status(200).json({ error: null, serie})
        
    } catch (error) {
        res.status(400).json({msg: "Acesso negado getSeries"})
    }
}

const deleteSeries = async(req, res) => {
    const token = req.header("auth-token")
    const userByToken = await getUserByToken(token)
    const userId = userByToken._id.toString()
    const serieId = req.body._id

    try {
        
        await Serie.deleteOne({ _id: serieId, userId: userId})
        res.status(200).json({ error: null, msg: "Serie removida com sucesso"})

    } catch (error) {
        res.status(400).json({msg: "Acesso negado deleteSeries"})
    }
}

const updateSeries = async ( req,res ) => {
    
    const serieId = req.params?.id

    if(!mongoose.Types.ObjectId.isValid(serieId)){
         res.status(404).json({msg: 'serie não encontrado'})
    }
    const token = req.header('auth-token')
    const userByToken = await getUserByToken(token) 
    const userId = userByToken._id.toString()

    const serie = await Serie.findByIdAndUpdate({_id: serieId}, {userId}, { ...req.body })

    if(!serie){
         res.status(404).json({msg: 'não existe o serie'})
    }
    res.status(200).json(serie)
}

module.exports = { getUserSeries, createSeries, getSeries, deleteSeries, updateSeries }
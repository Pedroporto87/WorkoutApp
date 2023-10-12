const Aluno = require('../models/userModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3days'})
}
//login user
const loginUser = async (req,res) => {
    const {name, email, password} = req.body

    try{
        const aluno = await Aluno.login( name, email, password )
        const token = createToken(aluno._id)

        res.status(200).json({name, email, token})
    } catch(error) {
        res.status(400).json({error: error.message})
    }

    res.json({msg: 'Usuario cadastrado'})
}

//signup user

const signupUser = async (req,res) => {
    const {name, email, password} = req.body
    
    try{
        const aluno = await Aluno.signup( name, email, password )
        const token = createToken(aluno._id)

        res.status(200).json({name, email, token})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { loginUser, signupUser }
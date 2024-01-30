const Aluno = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const createToken = (_id, res) => {
    const generateToken = jwt.sign({_id}, process.env.SECRET, { expiresIn: '30days'})
    res.cookie('jwt', generateToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60  * 60 * 1000
    })
}
//login user
const loginUser = async (req,res) => {
    const {name, email, password} = req.body

    try{
        const user = await User.login( name, email, password )
        const token = createToken(user._id)

        res.status(200).json({name, email, token})
    } catch(error) {
        res.status(400).json({error: error.message})
    }

    res.json({msg: 'Usuario cadastrado'})
}

//signup user

const signupUser = async (req,res) => {
    const {name, email, password} = req.body

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
    
    try{
        const user = await User.create( name, email, password)

        if (user) {
            createToken(res, user._id);}

        res.status(200).json({      
            _id: user._id,
            name: user.name,
            email: user.email,})

    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { loginUser, signupUser }
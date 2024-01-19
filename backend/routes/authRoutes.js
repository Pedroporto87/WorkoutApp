const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const router = express.Router()

router.post('/register', async (req, res) => {

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const confirmedpassword = req.body.confirmedpassword

    if (name == null || email == null || password == null || confirmedpassword == null){
        return res.status(400).json({msg: "Por favor, preencha todos os campos"})   
    }

    if( password != confirmedpassword){
        return res.status(400).json({msg : "As senhas não conferem"})
    }

    const emailExists = await User.findOne({ email: email })

    if(emailExists){
        res.status(400).json({ msg: "O e-mail informado já foi cadastrado"})
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        name: name,
        email: email,
        password: passwordHash
    })

try {
    const newUser = await user.save()
    
    const token = jwt.sign(
        //payload
        {
            name: newUser.name,
            id: newUser._id
        },
        "nossosecret"
    )

    res.json({error: null, msg: "Você realizou o cadastro com sucesso", token: token, userId: newUser._id })
} catch (error) {
    res.status(400).json({ error })
}
})

router.post("/login", async (req, res) => {

    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({ email })

    if(!user){
        res.status(400).json({msg: "O e-mail não possui cadastro"})
    }

    const checkpassword = await bcrypt.compare(password, user.password)

    if(!checkpassword){
        res.status(400).json({msg: "Senha inválida"})
    }

    const token = jwt.sign(
        //payload
        {
            name: user.name,
            id: user._id
        },
        "nossosecret"
    )

    res.json({error: null, msg: "Você está logado!", token: token, userId: user._id })
})

module.exports = router
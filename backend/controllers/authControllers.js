const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const createToken = require('../utils/generateToken');
const { create } = require('domain');


const registerUser = async (req, res) => {

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

if (user) {
    createToken(res, user._id);
    await user.save()
    res.status(200).json({error: null, msg: "Você realizou o cadastro com sucesso", _id: user._id, name: user.name, email: user.email})
} else {
    res.status(400);
    throw new Error('Invalid User Data')
}    
}

const loginUser = async (req, res) => {

    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({ email }).select("+password")

    if(!user){
        res.status(400).json({msg: "O e-mail não possui cadastro"})
    }
    const checkpassword = await bcrypt.compare(password, user.password)
    if (checkpassword) {
    const token = createToken( res, user._id);  
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token
        });
      } else {
        res.status(401);
        res.status(400).json({msg: "Senha ou Email invalidos"})
      }

    /*const checkpassword = await bcrypt.compare(password, user.password)

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

    res.json({error: null, msg: "Você está logado!", token: token, userId: user._id })*/
}

const logoutUser = async( req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
      });
      res.status(200).json({ msg: 'O usuario não está mais logado' });
    }

const getUserProfile = async( req,res ) => {
    const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).json({ msg: 'O usuario não encontrado' });
  }
}

const updateUserProfile = async( req,res ) => {
    const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) { 
      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(req.body.password, salt)
      user.password = passwordHash;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(400).json({ msg: 'O usuario não encontrado' })
  }
}

module.exports = { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile }

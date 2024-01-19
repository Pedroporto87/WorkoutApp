const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/userModel.js')
const verifyToken = require('../helpers/check-token.js')
const getUserByToken = require('../helpers/getUserByToken')

const router = express.Router()

//get user
router.get('/:_id', verifyToken, async (req, res) => {
   
    const id = req.params._id

    //verify user
    try {
        const user = await User.findOne({ _id: id }, { password: 0 } )
        return res.json({error: null, user})
    } catch (err) {
       return res.status(400).json({msg: "Usuario não encontrado"})
    
    }

})

router.put("/", verifyToken, async (req, res) => {
    
    const token = req.header("auth-token");
    const user = await getUserByToken(token);
    const userReqId = req.body.id;
    const password = req.body.password;
    const confirmedpassword = req.body.confirmedpassword;
  
    const userId = user._id.toString();

    //check if user id is equal token user id
    if(userId != userReqId){
        res.status(401).json({ msg: "Acesso negado"})
    }
    //create an user object
    const updateData = {
        name: req.body.name,
        email: req.body.email
    }

    //check if passwords match
    if(password != confirmedpassword){
        res.status(401).json({ msg: "As senhas não conferem"})
        //change password
    } else if(password == confirmedpassword && password != null){

        //creating password
        const salt = await bcrypt.genSalt(12)
        const reqPassword = req.body.password;
        const passwordHash = await bcrypt.hash(reqPassword, salt)
        req.body.password = passwordHash;
        //add password to data
        updateData.password = passwordHash
    }

    try {      
  
        // returns updated data
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $set:  updateData}, {new: true});
        res.json({ error: null, msg: "Usuário atualizado com sucesso!", data: updatedUser });
    
      } catch (error) {
    
        res.status(400).json({ error })
          
      }
    
    
})

module.exports = router
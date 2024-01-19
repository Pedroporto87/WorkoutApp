const jwt = require('jsonwebtoken')

//middleware to validate token
const checkToken = (req, res, next) => {

    const token = req.header('auth-token')

    if(!token){
        res.status(401).json({msg: "Acesso negado"})
    }

    try {
        const verified = jwt.verify(token, "nossosecret")
        req.user = verified
        next()
    } catch (error) {
        return res.status(401).json({msg: 'O token é invalido'})
    }
}

module.exports = checkToken
const jwt = require('jsonwebtoken')


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.error(err); // Loga o erro para depuração
            return res.status(403).json({ message: 'Forbidden2', error: err.message });
        }
        req.email = decoded.UserInfo.email;
        req.id = decoded.UserInfo.id;
        next();
    });
}

module.exports = verifyJWT 
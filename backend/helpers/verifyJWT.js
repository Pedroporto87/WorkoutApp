const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.error(err); 
            return res.status(403).json({ message: 'Forbidden', error: err.message });
        }
        req.email = decoded.UserInfo.email;
        req.id = decoded.UserInfo.id;
        req.role = decoded.UserInfo.role;

        req.role = Array.isArray(decoded.UserInfo.role) ? decoded.UserInfo.role : [decoded.UserInfo.role];

        
        const allowedRoles = ['admin', 'user', 'personal', 'gym'];
        const userHasAllowedRole = req.role.some(role => allowedRoles.includes(role));

        if (!userHasAllowedRole) {
            return res.status(403).json({ message: 'Forbidden, user does not have the required role' });
        }

        next();
    });
}

module.exports = verifyJWT;
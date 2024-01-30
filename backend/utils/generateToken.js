const jwt = require('jsonwebtoken')

const createToken = (res, userId) => {
  const token = jwt.sign(
    {
        userId
    },
    "nossosecret",{expiresIn: '30d',});
   
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

module.exports = createToken
const express = require('express');
const router = express.Router();
const { login, refresh, logout } = require('../controllers/authControllers');
const loginLimiter = require('../helpers/loginLimiter');

// Correção: Use router.post() para definir rotas POST
router.post("/login", loginLimiter, login);

// Correção: Use router.get() para definir rotas GET
router.get("/refresh", refresh);

// Correção: Use router.post() para definir rotas POST
router.post("/logout", logout);

module.exports = router;

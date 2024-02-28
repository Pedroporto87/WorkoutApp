const express = require('express')
const router = express.Router()
const {
    createGym,
    findAllGyms,
    findGymById,
    updateGym,
    deleteGym,
} = require('../controllers/gymController')
const verifyJWT = require('../helpers/verifyJWT')

 // Criar uma nova academia
router.post('/', createGym);

// Buscar todas as academias
router.get('/', verifyJWT, findAllGyms);

// Buscar uma academia pelo ID
router.get('/:id', verifyJWT, findGymById);

// Atualizar uma academia pelo ID
router.patch('/:id', verifyJWT, updateGym);

// Deletar uma academia pelo ID
router.delete('/:id', verifyJWT, deleteGym);

module.exports = router;
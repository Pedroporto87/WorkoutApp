const express = require('express')
const router = express.Router()
const {
    createPersonal,
    getAllPersonals,
    getPersonalById,
    updatePersonal,
    deletePersonal } = require('../controllers/personalControllers')
const verifyJWT = require('../helpers/verifyJWT')

router.post('/', createPersonal);

router.get('/', verifyJWT, getAllPersonals);

router.get('/:id', verifyJWT, getPersonalById);

router.patch('/:id', verifyJWT, updatePersonal);

router.delete('/:id', verifyJWT, deletePersonal);

module.exports = router;
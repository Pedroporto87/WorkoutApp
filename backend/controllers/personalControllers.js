const Personal = require('../models/personalModel');
const bcrypt = require ('bcrypt')
const upload = require('../helpers/file-storage')

// Adicionando um novo Personal
const createPersonal = async (req, res) => {
    upload.single('image/')(req, res, async (error) => {
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        const { name, email, password, description, gym, clients } = req.body;
        const imageUrl = req.file ? req.file.path : ''; // Caminho da imagem
        
        

        try {
            // Verificar se o e-mail já existe
            const existingPersonal = await Personal.findOne({ email });
            if (existingPersonal) {
                return res.status(400).json({ message: 'E-mail já está em uso' });
            }

            // Criptografar a senha
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Criar o objeto personal
            const newPersonal = new Personal({
                name,
                email,
                password: hashedPassword,
                description,
                gym,
                clients: clients || []
            });
            await newPersonal.save();

            res.status(201).json({ message: 'Personal criado com sucesso', personalId: newPersonal._id });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar personal', error: error.message });
        }
    });
};

// Listando todos os Personals
const getAllPersonals = async (req, res) => {
    try {
        const personals = await Personal.find().populate('gym').populate('clients');
        res.status(200).json(personals);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Buscando um Personal por ID
const getPersonalById = async (req, res) => {
    try {
        const personal = await Personal.findById(req.params.id).populate('gym').populate('clients');
        if (!personal) {
            return res.status(404).json({ message: 'Personal not found' });
        }
        res.status(200).json(personal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualizando um Personal
const updatePersonal = async (req, res) => {
    upload.single('image/')(req, res, async (error) => {
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        const { name, email, password, description, gym, clients } = req.body;
        const imageUrl = req.file ? req.file.path : ''; // Caminho da imagem se uma nova imagem foi enviada

       

        try {
            const personalData = {
                name,
                email,
                description,
                gym,
                clients
            };

            // Se uma nova senha foi fornecida, criptografa-a
            if (password) {
                const salt = await bcrypt.genSalt(10);
                personalData.password = await bcrypt.hash(password, salt);
            }

            // Se uma nova imagem foi enviada, atualiza o caminho da imagem
            if (imageUrl) {
                personalData.imageUrl = imageUrl;
            }

            const updatedPersonal = await Personal.findByIdAndUpdate(req.params.id, personalData, { new: true });
            res.status(200).json(updatedPersonal);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
};

// Deletando um Personal
const deletePersonal = async (req, res) => {
    try {
        await Personal.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Personal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPersonal,
    getAllPersonals,
    getPersonalById,
    updatePersonal,
    deletePersonal
}
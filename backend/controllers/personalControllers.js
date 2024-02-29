const Personal = require('../models/personalModel');
const bcrypt = require ('bcrypt')
const upload = require('../helpers/file-storage')
const asyncHandler = require('express-async-handler') 
// Adicionando um novo Personal
const createPersonal = async (req, res) => {
    upload.single('image')(req, res, async (error) => {
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        const { name, email, password, role, gym, description, clients } = req.body;
        let imageUrl = req.body.imageUrl || '../../front-end/public/usuario-anonimo.png'; // Define um valor padrão aqui

        try {
            const existingPersonal = await Personal.findOne({ email });
            if (existingPersonal) {
                return res.status(400).json({ message: 'E-mail já está em uso' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            let personal = new Personal({
                name,
                email,
                password: hashedPassword,
                description,
                gym,
                clients: clients || [],
                imageUrl // Usa o valor padrão ou o fornecido no corpo da requisição
            });

            if (req.file) {
                personal.imageUrl = req.file.path; // Atualiza se um arquivo foi enviado
            }

            const savedPersonal = await Personal.create(personal);
            res.status(201).json({ message: "Personal criado com sucesso", personal: savedPersonal });
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar personal", error: error.message });
        }
    }); // Fechamento correto da função de callback e do método upload.single
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
const updatePersonal = asyncHandler(async (req, res) => {
    const { name, email, password, role, gym, personalDetails, imageUrl } = req.body; // Alterei 'personal' para 'personalDetails' para evitar confusão

    const personalId = req.params.id; // Certifique-se de que está capturando o ID corretamente (req.params.id ou req.id, conforme sua configuração de rota)

    try {
        const personal = await Personal.findById(personalId).exec();

        if (!personal) {
            return res.status(400).json({ message: 'Personal not found' });
        }

        // Atualizações condicionais dos campos
        if (name) personal.name = name;
        if (email) personal.email = email;
        if (role) personal.role = role;
        if (gym) personal.gym = gym;
        if (personalDetails) personal.personal = personalDetails; // Aqui, assumo que você queria atualizar uma propriedade chamada 'personal' no documento. Mudei o nome da variável para 'personalDetails' para evitar sobreposição com o objeto 'personal'.
        if (password) {
            personal.password = await bcrypt.hash(password, 10);
        }

        // Verifica se imageUrl está presente no body e atualiza diretamente
        if (imageUrl) {
            personal.imageUrl = imageUrl;
        } else if (req.file) { // Caso contrário, verifica se um arquivo foi enviado
            personal.imageUrl = req.file.path;
        }

        const updatedPersonal = await personal.save(); // Aqui estava o erro. Deve-se salvar 'personal', não 'user'.

        res.json({ message: `${updatedPersonal.name} updated`, personal: updatedPersonal });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar personal', error: error.message });
    }
});
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
const User = require('../models/userModel')
const Serie = require('../models/seriesModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const upload = require('../helpers/file-storage')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    upload.single('image')(req, res, async (error) => {
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        const { name, password, email, role, gym, personal } = req.body;
        let imageUrl = req.body.imageUrl || '../../front-end/public/usuario-anonimo.png';

        // Confirmação dos dados
        if (!name || !password || !email || !role || !gym) { // A presença de personal é opcional
            return res.status(400).json({ message: 'All fields are required except personal' });
        }

        // Verificação de duplicidade de email
        const duplicate = await User.findOne({ email }).lean().exec();

        if (duplicate) {
            return res.status(409).json({ message: 'Duplicate email' });
        }

        // Hash da senha
        const hashedPwd = await bcrypt.hash(password, 10);

        const userObject = { name, password: hashedPwd, email, role, gym, imageUrl, personal }; // Inclui personal

        // Criação e armazenamento do novo usuário
        const user = await User.create(userObject);

        if (user) {
            res.status(201).json({ message: `New user ${name} created`, user });
        } else {
            res.status(400).json({ message: 'Invalid user data received' });
        }
    });
});

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const userId = req.params.id; // Obtém o ID do usuário a partir da URL

    upload.single('image')(req, res, async (error) => {
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        const { name, email, password, role, gym, personal, imageUrl } = req.body;

        try {
            const user = await User.findById(userId).exec();

            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            // Atualizações condicionais dos campos
            if (name) user.name = name;
            if (email) user.email = email;
            if (role) user.role = role;
            if (gym) user.gym = gym;
            if (personal) user.personal = personal;
            if (password) {
                user.password = await bcrypt.hash(password, 10);
            }
            if (imageUrl) {
                user.imageUrl = imageUrl;
            } else if (req.file) { // Caso contrário, verifica se um arquivo foi enviado
                user.imageUrl = req.file.path;
            }

            const updatedUser = await user.save();

            res.json({ message: `${updatedUser.name} updated`, user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar usuário', error: error.message });
        }
    });
});

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req; 

    if (!id) {
        return res.status(400).json({ message: 'User ID Required' });
    }

    // Verifica se o usuário tem séries atribuídas antes de permitir a exclusão
    const hasSeries = await Serie.findOne({ user: id }).lean();
    if (hasSeries) {
        return res.status(400).json({ message: 'User has assigned series and cannot be deleted.' });
    }

    // Tenta encontrar e excluir o usuário
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Monta a resposta
    const reply = `User ${deletedUser.username} with ID ${deletedUser._id} deleted`;
    res.json({ message: reply });
});


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}
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

        const { name, password, email, role, gym } = req.body; // Inclui gym
        const imagePath = req.file ? req.file.path : '';

        // Confirmação dos dados
        if (!name || !password || !email || !role || !gym) { // Verifica se gym foi fornecido
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Verificação de duplicidade de email
        const duplicate = await User.findOne({ email }).lean().exec();

        if (duplicate) {
            return res.status(409).json({ message: 'Duplicate email' });
        }

        // Hash da senha
        const hashedPwd = await bcrypt.hash(password, 10);

        const userObject = { name, password: hashedPwd, email, role, gym, imageUrl: imagePath }; // Inclui gym

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
    upload.single('image')(req, res, async (error) => {
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        const { name, email, password, role, gym } = req.body; // Inclui gym
        const userId = req.id;
        const imagePath = req.file ? req.file.path : '';

        // Verifica a existência do usuário
        const user = await User.findById(userId).exec();

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Verificação de duplicidade de email
        if (email && email !== user.email) {
            const duplicate = await User.findOne({ email }).lean().exec();
            if (duplicate && duplicate._id.toString() !== userId) {
                return res.status(409).json({ message: 'Duplicate email' });
            }
        }

        // Atualizações condicionais dos campos
        if (name) user.name = name;
        if (email) user.email = email;
        if (role) user.role = role;
        if (gym) user.gym = gym; // Atualiza gym
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        if (imagePath) user.imageUrl = imagePath;

        const updatedUser = await user.save();

        res.json({ message: `${updatedUser.name} updated`, user: updatedUser });
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
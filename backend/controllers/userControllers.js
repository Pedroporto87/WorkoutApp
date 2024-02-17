const User = require('../models/userModel')
const Serie = require('../models/seriesModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

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
    const { name, password, email } = req.body

    // Confirm data
    if (!name || !password || !email ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const duplicate = await User.findOne({ email }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { name, "password": hashedPwd, email }

    // Create and store new user 
    const user = await User.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New user ${name} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userId = req.id;

    // Verifica se o usuário existe para atualizar
    const user = await User.findById(userId).exec();

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // Verifica se o email já existe, mas ignora o próprio usuário
    if (email) {
        const duplicate = await User.findOne({ email }).lean().exec();
        if (duplicate && duplicate._id.toString() !== userId) {
            return res.status(409).json({ message: 'Duplicate email' });
        }
    }

    // Atualiza apenas os campos fornecidos
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
        // Hash da senha
        user.password = await bcrypt.hash(password, 10); // salt rounds
    }

    const updatedUser = await user.save();

    res.json({ message: `${updatedUser.name} updated` });
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
const verifyJWT = require('../helpers/verifyJWT');
const Serie = require('../models/seriesModel')
const User = require('../models/userModel')

// @desc Get all series 
// @route GET /series
// @access Private
const getAllSeries = async (req, res) => {
    const series = await Serie.find().lean();
    if (!series?.length) {
        return res.status(400).json({ message: 'No series found' });
    }

    const seriesWithUser = await Promise.all(series.map(async (serie) => {
        const user = await User.findById(serie.user).lean().exec();
        // Cria um novo objeto com as propriedades desejadas.
        return {
            ...serie, // Espalha as propriedades do objeto serie aqui
            name: user?.name, // Usa o operador de encadeamento opcional para evitar erros caso user seja null/undefined
            userId: user?._id // Mesmo que acima
        };
    }));

    res.json(seriesWithUser);
};

// @desc Create new Serie
// @route POST /series
// @access Private
const createNewSerie = async (req, res) => {
    const { title } = req.body;
    const userId = req.id

    if (!title) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (!userId) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    // Verifica duplicatas considerando o mesmo usuário
    const duplicate = await Serie.findOne({ title, user: userId }).collation({ locale: 'pt', strength: 2 }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate Serie title for this user' });
    }

    // Cria e armazena a nova série com a referência ao usuário
    const newSerie = await Serie.create({ title, user: userId });

    if (newSerie) {
        return res.status(201).json({ message: 'New Serie created' });
    } else {
        return res.status(400).json({ message: 'Invalid Serie data received' });
    }
};
// @desc Update a Serie
// @route PATCH /series
// @access Private
const updateSerie = async (req, res) => {
    
    try {
        const { id } = req.params;
        const { title } = req.body
        
        const result = await Serie.findByIdAndUpdate(id, { title }, { new: true });
        if (!result) {
            return res.status(404).json({ message: 'Série não encontrada.' });
        }

        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    
}

// @desc Delete a Serie
// @route DELETE /series
// @access Private
const deleteSerie = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Serie.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Série não encontrada.' });
        }

        res.json({ message: 'Série deletada com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSeries = async(req,res) => {
    try {
        const user = req.id

        const series = await Serie.find({ user });
        res.json(series);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllSeries,
    getSeries,
    createNewSerie,
    updateSerie,
    deleteSerie
}
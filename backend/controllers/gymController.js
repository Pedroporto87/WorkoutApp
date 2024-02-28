const Gym = require('../models/gymModel')

// Criação de uma nova academia
const createGym = async (req, res) => {
  try {
    const gym = new Gym({
      ...req.body
    });
    await gym.save();
    res.status(201).json(gym);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Buscar todas as academias
const findAllGyms = async (req, res) => {
  try {
    const gyms = await Gym.find();
    res.status(200).json(gyms);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Buscar uma academia pelo ID
const findGymById = async (req, res) => {
  try {
    const gym = await Gym.findById(req.params.id);
    if (!gym) {
      return res.status(404).json({ message: 'Gym not found' });
    }
    res.status(200).json(gym);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Atualizar uma academia pelo ID
const updateGym = async (req, res) => {
  try {
    const gym = await Gym.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!gym) {
      return res.status(404).json({ message: 'Gym not found' });
    }
    res.status(200).json(gym);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Deletar uma academia pelo ID
const deleteGym = async (req, res) => {
  try {
    const gym = await Gym.findByIdAndDelete(req.params.id);
    if (!gym) {
      return res.status(404).json({ message: 'Gym not found' });
    }
    res.status(200).json({ message: 'Gym deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
    createGym,
    findAllGyms,
    findGymById,
    updateGym,
    deleteGym,
}
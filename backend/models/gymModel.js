const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gymSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  normalized_name: { // Para busca e prevenção de duplicatas
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  user: { // Referência ao usuário proprietário da academia
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  personals: [{ // Lista de personal trainers associados
    type: Schema.Types.ObjectId,
    ref: 'Personal'
  }],
  description: { // Descrição da academia
    type: String,
    required: true
  },
  image: [{ // URLs das fotos da academia
    type: String
  }],
  location: { // Localização geográfica da academia
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  facilities: [{ // Facilidades oferecidas pela academia
    type: String
  }],
  openingHours: [{ // Horários de funcionamento
    day: {
      type: String,
      required: true
    },
    open: {
      type: String,
      required: true
    },
    close: {
      type: String,
      required: true
    }
  }],
  membershipFees: { // Informações sobre as taxas de adesão/mensalidades
    type: Number,
    required: true
  },
  contactInfo: { // Informações de contato
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  role: { type: String, default: 'gym' },
  reviews: [{ // Avaliações da academia
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true
    },
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

// Índice geoespacial para a localização
gymSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Gym', gymSchema);
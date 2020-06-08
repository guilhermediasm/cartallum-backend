const bcrypt = require('bcryptjs');
const mongoose = require('../database');
const endereco = require('./utils/endereco');

const InstituicaoSchema = new mongoose.Schema({
  nomeInstituicao: {
    type: String,
    require: true,
  },
  tipo: {
    type: String,
    require: false,
  },
  email: {
    type: String,
    require: false,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
  },
  telefone: {
    type: String,
    require: false,
  },
  endereco,
});

InstituicaoSchema.pre('save', async (next) => {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const Instituicao = mongoose.model('Instituicao', InstituicaoSchema);

module.exports = Instituicao;

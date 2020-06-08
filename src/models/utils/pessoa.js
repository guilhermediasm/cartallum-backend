const mongoose = require('mongoose');

const pessoa = new mongoose.Schema({
  nomeCompleto: {
    type: String,
    require: true,
  },
  dataNascimento: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    require: true,
  },
  telefone: {
    type: String,
    require: false,
  },
});

module.exports = pessoa;

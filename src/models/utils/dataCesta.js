const mongoose = require('mongoose');

const dataCesta = new mongoose.Schema({
  nomeInstituicao: {
    type: String,
    required: false,
  },
  data: {
    type: String,
    require: false,
  },
});

module.exports = dataCesta;

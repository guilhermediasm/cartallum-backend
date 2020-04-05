const mongoose = require('../database');
const bcrypt = require('bcryptjs')
const endereco = require('./utils/endereco')

const AgenteSchema = new mongoose.Schema({
    nomeInstituicao: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: false,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    telefone: {
        type: Number,
        required: true
    },
    endereco: endereco,
});

AgenteSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

const Agente = mongoose.model('Agente', AgenteSchema);

module.exports = Agente;
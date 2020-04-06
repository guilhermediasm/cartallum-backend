const express = require('express');

const Familia = require('../models/familia');

const router = express.Router();

router.get('/get_familia', async (req, res) => {

    try {

        const familia = await Familia.find();

        return res.send(familia);
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });

    }
})

router.post('/busca_familia', async (req, res) => {
    const { cpf } = req.query
    console.log(cpf)


    const familia = await Familia.find({
        "integrantes.cpf": { $eq: cpf }
    });
    console.log(familia)
    if (familia != null) {
        return res.send(familia);
    } else {
        return res.status(200).send({
            success: true,
            mensagem: "Ninguem foi encontrado"
        })
    }


})
module.exports = app => app.use('/data', router);
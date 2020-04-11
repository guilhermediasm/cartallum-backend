const express = require('express');

const Familia = require('../models/familia');

const router = express.Router();

//Busca todas as familias
const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware);

router.get('/get_familia', async (req, res) => {

    try {

        const familia = await Familia.find();

        return res.send({ success: true, familia });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });

    }
})

router.post('/update_cesta', async (req, res) => {
    const { id, cesta } = req.body
    try {

        await Familia.updateOne({ _id: id }, { $push: { dataCestas: cesta } })
        const familia = await Familia.find({ _id: id })
        
        return res.send({ success: true, familia });

    } catch (err) {
        return res.status(400).send({ error: 'Erro em encontrar familia' });

    }

})


//busca familia pelo cpf do integrante
router.post('/busca_familia', async (req, res) => {
    const { cpf } = req.body

    const familia = await Familia.find({
        "integrantes.cpf": { $eq: cpf }
    });

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
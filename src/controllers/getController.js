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
        await Familia.find({ "_id": id }).then(success => {
            return res.send({ success: true, familia: success });
        })



    } catch (err) {
        return res.status(400).send({ error: 'Erro em encontrar familia' });

    }

})



//busca familia pelo cpf do integrante
router.post('/busca_familia', async (req, res) => {
    const { cpf } = req.body
    const { nomeCompleto } = req.body
    console.log(nomeCompleto)

    if (cpf !== '') {
        const familia = await Familia.find({
            "integrantes.cpf": { $eq: cpf }
        });

        return res.status(200).send({ success: true, familia, qtdIntegrantes: familia.length });

    } else if (nomeCompleto !== '') {
        const familia = await Familia.find({
            "integrantes.nomeCompleto": { $eq: nomeCompleto }
        });


        return res.status(200).send({ success: true, familia, qtdIntegrantes: familia.length });

    } else if (cpf == '' && nomeCompleto == '') {
        return res.status(400).send({
            success: false,
            mensagem: "O CPF e o nome se encontra em formato invalido ou nao foi passado"
        })
    }


})
module.exports = app => app.use('/data', router);
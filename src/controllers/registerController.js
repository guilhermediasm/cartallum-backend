const express = require('express');

const Familia = require('../models/familia');

const router = express.Router();

const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware);

//Cadastra familia
router.post('/cadastroFamilia', async (req, res) => {
    const { integrantes } = req.body
    var familia = []
    try {
        for (i = 0; i < integrantes.length; i++) {
            familia = await Familia.find({
                "integrantes.cpf": { $eq: integrantes[i].cpf }

            })

        }

        if (familia.length == 0) {
            Familia.create(req.body).then(success => {
                return res.status(200).send({ success });
            })
                .catch(err => {
                    res.status(200).send({ success: false, msg: 'ocorreu um erro na hora de cadastrar familia, por favor tente mais tarde', erro: err });
                })
        } else {
            res.status(200).send({ success: false, msg: 'Já exite um integrante com esse cpf' });
        }
    } catch (error) {
        res.status(200).send({ success: false, msg: 'ocorreu um erro na hora de cadastrar familia, por favor tente mais tarde', erro: error });
    }


})
module.exports = app => app.use('/register', router);
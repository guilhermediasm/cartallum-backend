const express = require('express');

const router = express.Router();

const Instituicao = require('../models/instituicao');

const authMiddleware = require('../middlewares/auth')

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}


router.use(authMiddleware);
router.post('/cadastro', async (req, res) => {
    const { email, nomeInstituicao } = req.body

    try {
        if (await Instituicao.findOne({ email })) {

            return res.status(200).send({ success: false, msg: 'Já exite uma Instituição com esse email, favor verificar o email' });
        } else if (await Instituicao.findOne({ nomeInstituicao })) {
            return res.status(200).send({ success: false, msg: 'Já exite uma Instituição com esse Nome, favor verificar o nome' });
        }

        const instituicao = await Instituicao.create(req.body);

        instituicao.password = undefined

        return res.send({ success: true, instituicao });
    } catch (err) {
        console.log(err)
        return res.status(200).send({ success: false, msg: 'Ocorreu um erro no hora de cadastrar instituição, tende mais tarde', erro: err });

    }
})

router.get('/listarInstituicao', async (req, res) => {

    try {
        const instituicao = await Instituicao.find();

        instituicao.password = undefined

        return res.send({ success: true, instituicao });
    } catch (err) {
        return res.status(200).send({ success: false, msg: 'Ocorreu um erro em listar a instituição, tende mais tarde', erro: err });

    }
})



module.exports = app => app.use('/instituicao', router);
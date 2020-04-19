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
            return res.status(400).send({ error: 'Já exite uma Instituição com esse email, favor verificar o email' });
        } else if (await Instituicao.findOne({ nomeInstituicao })) {
            return res.status(400).send({ error: 'Já exite uma Instituição com esse Nome, favor verificar o nome' });
        }

        const instituicao = await Instituicao.create(req.body);

        instituicao.password = undefined

        return res.send({ instituicao, token: generateToken({ id: instituicao.id }) });
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu um erro no hora de cadastrar instituição, tende mais tarde', err: err });

    }
})

router.get('/listarInstituicao', async (req, res) => {

    try {
        const instituicao = await Instituicao.find();

        instituicao.password = undefined

        return res.send({ instituicao });
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu um erro em listar a instituição, tende mais tarde', err: err });

    }
})



module.exports = app => app.use('/instituicao', router);
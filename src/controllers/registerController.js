const express = require('express');

const User = require('../models/familia');

const router = express.Router();

const Instituicao = require('../models/instituicao');


function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}
const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware);

//Cadastra familia
router.post('/cadastroFamilia', async (req, res) => {
    try {
        console.log('req.body:', req.body)
        const familia = await User.create(req.body);


        return res.send({ familia });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed', menssagem: err });

    }
})

router.post('/register', async (req, res) => {
    const { email, nomeInstituicao } = req.body

    try {
        if (await Instituicao.findOne({ email })) {
            return res.status(400).send({ error: 'Instituicao already exists' });
        } else if (await Instituicao.findOne({ nomeInstituicao })) {
            return res.status(400).send({ error: 'Instituicao already exists' });
        }
        const instituicao = await Instituicao.create(req.body);

        instituicao.password = undefined

        return res.send({ instituicao, token: generateToken({ id: instituicao.id }) });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });

    }
})

module.exports = app => app.use('/register', router);
const express = require('express');

const router = express.Router();

const Instituicao = require('../models/instituicao');


function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}

router.post('/cadastro', async (req, res) => {
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
        return res.status(400).send({ error: 'Registration failed', err: err });

    }
})



module.exports = app => app.use('/instituicao', router);
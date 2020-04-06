const express = require('express');
const bcrypt = require('bcryptjs');

const Instituicao = require('../models/instituicao');

const router = express.Router();

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

        return res.send({ instituicao });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });

    }
})

router.post('/authenticate', async (req, res) => {
    const { login, password } = req.body
    const email = login;
    const nomeInstituicao = login;
    var instituicao = null

    try {
        if (await Instituicao.findOne({ email })) {
            console.log('Entrou')
            instituicao = await Instituicao.findOne({ email }).select('+password')
        } else if (await Instituicao.findOne({ nomeInstituicao })) {
            instituicao = await Instituicao.findOne({ nomeInstituicao }).select('+password')
        } else {
            return res.status(400).send({ success: false, error: 'User not found' });
        }

        if (!await bcrypt.compare(password, instituicao.password))
            return res.status(400).send({ success: false, error: 'Invalid password' });

        res.send({
            success: true,
            instituicao
        })
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });

    }
})

module.exports = app => app.use('/auth', router);
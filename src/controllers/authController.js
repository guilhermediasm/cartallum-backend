const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth')

const Instituicao = require('../models/instituicao');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}


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

        instituicao.password = undefined;


        res.send({
            success: true,
            instituicao,
            token: generateToken({ id: instituicao.id })
        })
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });

    }
})

module.exports = app => app.use('/auth', router);
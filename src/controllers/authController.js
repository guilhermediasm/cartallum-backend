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

            instituicao = await Instituicao.findOne({ email }).select('+password')
        } else if (await Instituicao.findOne({ nomeInstituicao })) {
            instituicao = await Instituicao.findOne({ nomeInstituicao }).select('+password')
        } else {
            return res.status(200).send({ success: false, msg: 'Essa instituição não exite, favor cadastrar' });
        }

        if (!await bcrypt.compare(password, instituicao.password))
            return res.status(200).send({ success: false, msg: 'A senha e inválida' });

        instituicao.password = undefined;


        res.send({
            success: true,
            instituicao,
            token: generateToken({ id: instituicao.id })
        })
    } catch (err) {
        return res.status(200).send({ success: false, msg: 'Ocorreu um erro na autenticação, por favor tente mais parte', erro: err });

    }
})

module.exports = app => app.use('/auth', router);
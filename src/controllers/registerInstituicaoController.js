const express = require('express');

const router = express.Router();

const Instituicao = require('../models/instituicao');
const bcrypt = require('bcryptjs');

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

router.post('/editar', async (req, res) => {
    const { _id, nomeInstituicao } = req.body
    const { rua, bairro } = req.body.endereco
    if (req.body != undefined) {
        if (nomeInstituicao != null || nomeInstituicao != undefined) {
            if (rua != null || bairro != undefined || bairro != null || rua != undefined) {
                try {
                    if (await Instituicao.findOne({ _id })) {
                      
                        if (req.body.password != undefined && req.body.password != null && req.body.password != "" && req.body.password != " ") {
                            const hash = await bcrypt.hash(req.body.password, 10);
                            req.body.password = hash;
                        }else{
                            const instituicao = await Instituicao.findOne({ _id })
                            req.body.password = instituicao.password
                        }

                        await Instituicao.updateOne({ _id }, { $set: req.body })

                        return res.status(200).send({ success: true, msg: "Instituição foi atualizada" });

                    } else {
                        return res.status(200).send({ success: false, msg: 'Erro ao encontrar o id dessa instituição' })
                    }

                } catch (err) {
                    console.log(err)
                    return res.status(200).send({ success: false, msg: 'Ocorreu um erro na hora de editar instituição', erro: err });

                }
            } else {
                return res.status(200).send({ success: false, msg: 'Verifique o endereço o bairro ou a rua esta vazia' });
            }
        } else {
            return res.status(200).send({ success: false, msg: 'Por favor informar o nome da instituição' });
        }
    } else {
        return res.status(200).send({ success: false, msg: 'Ocorreu um erro na hora de editar instituição, favor informar os dados corretamente' });

    }
})



module.exports = app => app.use('/instituicao', router);
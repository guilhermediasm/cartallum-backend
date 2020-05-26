const express = require('express');

const Familia = require('../models/familia');
const Instituicao = require('../models/instituicao');

const router = express.Router();

//Busca todas as familias
const authMiddleware = require('../middlewares/auth')
const authMiddlewareEmail = require('../middlewares/email')

 router.use(authMiddleware);
router.use(authMiddlewareEmail);

router.get('/get_relatorio', async (req, res) => {

    try {

        const familia = await Familia.find();
        const instituicao = await Instituicao.find();

        var data = []
        instituicao.map(valueInsituicao => {
            data.push({
                nomeInstituicao: valueInsituicao.nomeInstituicao,
                quantidade: 0,
                ativa: true
            })
        })

        familia.map(valueFamilia => {
            valueFamilia.dataCestas.map(valueCesta => {

                let entrou = false;
                data.map(valueData => {
                    if (valueData.nomeInstituicao == valueCesta.nomeInstituicao) {
                        entrou = true
                        valueData.quantidade = valueData.quantidade + 1
                    }
                })
                if (!entrou) {
                    data.push({
                        nomeInstituicao: valueCesta.nomeInstituicao == undefined ? 'Erro Nome' : valueCesta.nomeInstituicao,
                        quantidade: 1,
                        ativa: false
                    })
                }
            })
        })

        return res.send(
            {
                success: true,
                qtdFamilia: familia.length,
                qtdInstituicao: instituicao.length,
                data
            }
        );
    } catch (err) {
        console.log(err)
        return res.status(200).send({ success: false, msg: 'Ocorreu um erro em buscar o relatorio', erro: err });

    }
})

router.get('/get_familia', async (req, res) => {

    try {

        const familia = await Familia.find();

        return res.send({ success: true, familia });
    } catch (err) {
        return res.status(200).send({ success: false, msg: 'Ocorreu um erro em buscar as familias, por favor tente mais tarde', erro: err });

    }
})

router.post('/update_cesta', async (req, res) => {
    const { id, cesta } = req.body
    try {

        await Familia.updateOne({ _id: id }, { $push: { dataCestas: cesta } })
        await Familia.find({ "_id": id }).then(success => {
            return res.status(200).send({ success: true, familia: success });
        })
            .catch(erro => {
                return res.status(200).send({ success: false, msg: 'Ocorreu um erro em doar cesta', erro: erro });
            })



    } catch (err) {
        return res.status(200).send({ success: false, msg: 'Erro em encontrar familia', erro: err });

    }

})



//busca familia pelo cpf do integrante
router.post('/busca_familia', async (req, res) => {
    const { cpf } = req.body
    const { nomeCompleto } = req.body

    if (cpf !== '') {
        const familia = await Familia.find({
            "integrantes.cpf": { $eq: cpf }
        });

        return res.status(200).send({ success: true, familia, qtdIntegrantes: familia.length });

    } else if (nomeCompleto !== '') {
        const familia = await Familia.find({
            "integrantes.nomeCompleto": { $regex: nomeCompleto }
        });


        return res.status(200).send({ success: true, familia, qtdIntegrantes: familia.length });

    } else if (cpf == '' && nomeCompleto == '') {
        return res.status(200).send({
            success: false,
            msg: "O CPF e o nome se encontra em formato invalido ou nao foi passado"
        })
    }


})
module.exports = app => app.use('/data', router);
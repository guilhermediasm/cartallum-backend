const express = require('express');

const router = express.Router();

router.get(async (req, res) => {

    try {
        return res.status(200).send({
            success: true,
            menssagem: "Iniciado"
        });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });

    }
})



module.exports = app => app.use('/', router);
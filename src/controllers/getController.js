const express = require('express');

const Familia = require('../models/familia');

const router = express.Router();

router.get('/get_familia', async (req, res) => {

    try {

        const familia = await Familia.find();

        return res.send(familia);
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });

    }
})

module.exports = app => app.use('/data', router);
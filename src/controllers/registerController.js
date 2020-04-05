const express = require('express');

const User = require('../models/familia');

const router = express.Router();

router.post('/cadastroFamilia', async (req, res) => {
    // const { email } = req.body

    try {
        // if (await User.findOne({ email }))
        // return res.status(400).send({ error: 'User already exists' });


        const familia = await User.create(req.body);


        return res.send({ familia });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });

    }
})

module.exports = app => app.use('/register', router);
const express = require('express');

const User = require('../models/familia');

const router = express.Router();

router.post('/cadastroFamilia', async (req, res) => {
      try {
        const familia = await User.create(req.body);


        return res.send({ familia });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });

    }
})

module.exports = app => app.use('/register', router);
const express = require('express');

const User = require('../models/familia');

const router = express.Router();

const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware);

//Cadastra familia
router.post('/cadastroFamilia', async (req, res) => {
    User.create(req.body).then(success => {
        return res.send({ success });
    })
        .catch(err => {
            console.log('req.body:', err)
            res.status(400).send({ error: 'Registration failed', menssagem: err });
        })
})
module.exports = app => app.use('/register', router);
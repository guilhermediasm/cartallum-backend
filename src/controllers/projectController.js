const express = require('express');

const authMiddleware = require('../middlewares/auth')
const authMiddlewareEmail = require('../middlewares/email')
const router = express.Router();

router.use(authMiddleware);
router.use(authMiddlewareEmail);
router.get('/', (req, res) => {
    res.send({ success: true, instituicao: req.userId });
})


module.exports = app => app.use('/projects', router)
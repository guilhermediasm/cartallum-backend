const Instituicao = require('../models/instituicao');

module.exports = async (req, res, next) => {

    const authHeader = req.headers.authorizationemail;
    
    if (authHeader != undefined) {
        if (await Instituicao.findOne({ email: authHeader })) {

            return next();
        }
        return res.status(200).send({ success: false, error: 401, msg: 'Essa instituição não está mais disponivel' });
    }
    return res.status(200).send({ success: false, error: 401, msg: 'Ocorreu um erro na verificação do Email da Instituição' });

};
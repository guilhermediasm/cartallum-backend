const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(200).send({
      success: false,
      error: 401,
      menssagem: 'No token provided',
      msg: 'Acesso não autorizado',
    });

  const parts = authHeader.split(' ');

  if (!parts.length === 2)
    return res.status(200).send({
      success: false,
      error: 401,
      menssagem: 'Token error',
      msg: 'Acesso não autorizado',
    });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(200).send({
      success: false,
      error: 401,
      menssagem: 'Token malformatted',
      msg: 'Acesso não autorizado',
    });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err)
      return res.status(200).send({
        success: false,
        error: 401,
        menssagem: 'Toen invalid',
        msg: 'Acesso não autorizado',
      });

    req.userId = decoded.id;

    return next();
  });
};

const jwt = require('jsonwebtoken');
const { response } = require('express');

const validateJWT = (req, res = response, next) => {
  // x-token headers
  const token = req.header('x-token');


  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no encontrado'
    })
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    // get the data saved in JWT {uid, name, iat, exp}
    // can use exp to evaluate wether to renew token in other parts

    req.uid = uid;
    req.name = name;

  } catch (error) {
    // solo si falla
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido'
    })
  }
  
  next();
}

module.exports = {
  validateJWT,
}
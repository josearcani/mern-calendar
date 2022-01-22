const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {

    let user = await User.findOne({ email });
    //console.log(user); // null if email not exist
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'Un usuario existe con ese correo',
      })
    }

    user = new User(req.body);

    // encryt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // generate JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });
  } catch (error) {
    console.log(error); // for admin
    res.status(500).json({
      ok: false,
      msg: 'Hablar con el admininstador'
    })
  }
}

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Correo o contraseña no válido - correo'
      })
    }

    // validate password
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Correo o contraseña no válido - contraseña'
      })
    }

    // generate JWT
    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    }) 

  } catch (error) {
    console.log(error); // for admin
    res.status(500).json({
      ok: false,
      msg: 'Hablar con el admininstador'
    })
  }

}

const renewToken = async (req, res = response) => {
  
  // this data only avalable if token is verified
  const { uid, name } = req;
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    uid,
    name,
    token
  })
}

module.exports = {
  createUser,
  loginUser,
  renewToken,
}

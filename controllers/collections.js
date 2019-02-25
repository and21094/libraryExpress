'use strict'

const tokenService = require('../services/token');
const utils = require('../lib/utils');
const DB = require('../services/db');

var getCollections = async (req, res) => {

  if (!req.headers.authorization || !req.query.user) {
    return res.status(403).json({ error: 'No credentials sent!' });
  }

  
  const user = req.query.user;
  const token = await tokenService.extractToken(req);
  const veryfiedToken = await tokenService.verifyToken(token);
  
  if (veryfiedToken.userId !== user) {
    return res.status(403).json({ error: 'Invalid credentials sent!' });
  }
  
  const db = new DB();
  
//   const data = await req.body;

  const query = await db.collections.find(user);
  const data = query.data;

  return res.send({ result: true, data });

//   const user = query.data;
//   const checkedPassword = await utils.checkPassword(user.password, Buffer.from(data.password, 'base64').toString());

//   if (!checkedPassword) {
//     res.send({ result: false, message: 'Los datos que has ingresado para iniciar sesión no son válidos.' });
//     return;
//   }

//   const token = await tokenService.signToken({ userId: user._id });

  // res.send({ result: true, data: {meesagge: 'hi'} });
  // return;
}

module.exports = {
    getCollections
};
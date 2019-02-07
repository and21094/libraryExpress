'use strict'

const tokenService = require('../services/token');
const utils = require('../lib/utils');
const boom = require('boom');
const DB = require('../services/db');

var login = async (req, res) => {
  const db = new DB();
  const data = await req.body;

  const query = await db.users.findOne(data);

  if (!query.result || !query.data) {
    throw boom.badRequest('Invalid data');
  }

  const user = query.data;
  const checkedPassword = await utils.checkPassword(user.password, Buffer.from(data.password, 'base64').toString());

  if (!checkedPassword) {
    throw boom.badRequest('Invalid data');
  }

  const token = await tokenService.signToken({ userId: user._id });
  const message = { result: true, user: user._id, token };

  res.json(message);
}

module.exports = {
  login
};
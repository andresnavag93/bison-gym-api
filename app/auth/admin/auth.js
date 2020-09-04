'use strict';

/** Module for json web tokens creation */
const jwt = require('jsonwebtoken');

// Console Debug Information
const debug = require('debug')('bison-backend:auth:auth');

/** Creates a new token */
async function sign(payload, secret) {
  var token = await jwt.sign(payload, secret, { expiresIn: '1d' });
  return token;
}

/** Verifies a provided token */
async function verify(token, secret) {
  var res = null;

  try {
    res = await jwt.verify(token, secret);
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      return false;
    } else {
      debug('Error: ', e.name);
    }
  }

  return res;
}

module.exports = {
  sign,
  verify
};

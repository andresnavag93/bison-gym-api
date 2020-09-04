/* eslint-disable no-console */
'use strict';

/** Encryption Module */
const bcrypt = require('bcrypt');

/** Color messages for console */
const chalk = require('chalk');

/** Internationalization */
const i18n = require('../i18n/i18n');

/** Encrypts a password */
async function encrypt(password) {
  try {
    var salt = await bcrypt.genSaltSync();
    var hash = await bcrypt.hashSync(password, salt);
  } catch (error) {
    console.log(`${chalk.red('[Bison Api Backend]:')} Error hashing password!`);
    return {
      error: {
        msg: i18n.__('users.password.hashing')
      }
    };
  }

  return hash;
}

/** Checks password */
async function comparePassword(password, hash) {
  try {
    var res = bcrypt.compareSync(password, hash);
  } catch (error) {
    console.log(
      `${chalk.red('[Bison Api Backend]:')} Error decrypting password password!`
    );
    return {
      error: {
        msg: i18n.__('users.password.hashing')
      }
    };
  }

  return res;
}

module.exports = {
  encrypt,
  comparePassword
};

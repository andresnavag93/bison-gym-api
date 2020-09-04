/* eslint-disable no-unused-vars */
'use strict';

/**
 * String random generare with specific range
 *
 * @param {*} length
 * @returns
 */
function codeGenerator(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = {
  codeGenerator
};

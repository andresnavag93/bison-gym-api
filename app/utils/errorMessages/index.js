/* eslint-disable no-unused-vars */
'use strict';

/**
 * Generic object for errors systems
 *
 * @param {*} msg
 * @param {*} code
 * @returns
 */
function errorMessage(msg, code) {
  return {
    error: { msg },
    code
  };
}

module.exports = {
  errorMessage
};

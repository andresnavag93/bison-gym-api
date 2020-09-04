'use strict';

// Configuration
const config = require('../../config/config');
// User Validation
const { validateUsersGyms } = require('../../utils/validateUsersGyms');

/**
 * Generic Get Base Route
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} service Service
 * @param {*} action Service function
 * @param {*} paramsValues Params Values
 */

async function baseRoute(req, res, service, action, paramsValues) {
  let gymId, userGroupId;
  if (req.user) {
    gymId = req.user.gymId;
    userGroupId = req.user.userGroupId;
  } else {
    gymId = parseInt(req.headers['gym_id'] || null);
    if (isNaN(gymId)) {
      gymId = null;
    }
    userGroupId = parseInt(req.headers['user_group_id'] || null);
    if (isNaN(userGroupId)) {
      userGroupId = null;
    }
  }

  // Get request params
  let locale = req.headers['accept-language'] || config.locale;
  let auth = req.headers['authorization'] || null;
  let authHeader = [auth, gymId, userGroupId];

  // Validate user and gyms
  const validation = await validateUsersGyms(locale, userGroupId, gymId);
  if (validation !== true) {
    res.status(validation.code);
    delete validation['code'];
    return validation;
  }
  // Response Variable
  const resp = await service[action](locale, authHeader, paramsValues);

  // HTTP Status Codes
  if (resp.code) {
    res.status(resp.code);
    delete resp['code'];
  } else {
    res.status(200);
  }

  return resp;
}
module.exports = {
  baseRoute
};

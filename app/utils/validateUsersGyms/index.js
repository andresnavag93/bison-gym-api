const { UsersGroup } = require('../../database/models');
// Internationalization
const i18n = require('../../i18n/i18n');
// Generic Error Message
const { errorMessage } = require('../../utils/errorMessages');

/**
 * Validate in gym or user are active or delete
 *
 * @param {*} locale
 * @param {*} userGroupId
 * @param {*} gymId
 * @returns
 */
async function validateUsersGyms(locale, userGroupId, gymId) {
  try {
    if (gymId) {
      i18n.setLocale(locale);
      let user = await UsersGroup.findOne({
        attributes: ['id', 'isActive', 'isDelete'],
        where: {
          id: userGroupId
        },
        include: [
          {
            association: 'gym',
            attributes: ['id', 'isActive', 'isDelete'],
            where: { id: gymId }
          }
        ]
      });

      if (user === null) {
        return errorMessage(i18n.__('users.notFound'), 404);
      } else {
        if (user.isDelete) {
          return errorMessage(i18n.__('users.isDelete'), 404);
        } else if (!user.isActive) {
          return errorMessage(i18n.__('users.noActive'), 404);
        } else if (user.gym.isDelete) {
          return errorMessage(i18n.__('gyms.isDelete'), 404);
        } else if (!user.gym.isActive) {
          return errorMessage(i18n.__('gyms.noActive'), 404);
        }
      }
    }
    return true;
  } catch (e) {
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

module.exports = {
  validateUsersGyms
};

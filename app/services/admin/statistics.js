/* eslint-disable no-unused-vars */
'use strict';

// Internationalization
const i18n = require('../../i18n/i18n');
// Console Debug Information
const debug = require('debug')('bison-backend:services:statistics');
// Models
const {
  Payment,
  User,
  Discipline,
  Participant,
  UsersGroup,
  PlansUsersGroup
} = require('../../database/models');
// Sequelize Operations
const { Op, fn, col, literal } = require('sequelize');
// Generic Error Message
const { errorMessage } = require('../../utils/errorMessages');

/**
 * Get top 10 best coaches
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getTop10CoachBestRating(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId;
    if (authHeader[1]) {
      gymId = authHeader[1];
    } else {
      gymId = paramsValues[0];
    }

    // Query
    let where = {
      isDelete: false,
      gymId,
      groupId: 11,
      [Op.not]: { ratingCount: null }
    };
    let res = await UsersGroup.findAll({
      attributes: [
        'id',
        'points',
        'rating',
        'admissionDate',
        'isActive',
        'groupId'
      ],
      where: where,
      include: [
        {
          association: 'user',
          where: { isDelete: false },
          attributes: ['id', 'name', 'lastname']
        }
      ],
      order: [['rating', 'DESC']],
      limit: 10
    });
    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Get top 10 worst coaches
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getTop10CoachWorstRating(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId;
    if (authHeader[1]) {
      gymId = authHeader[1];
    } else {
      gymId = paramsValues[0];
    }
    // Query
    let where = {
      isDelete: false,
      gymId,
      groupId: 11,
      [Op.not]: { ratingCount: null }
    };
    let res = await UsersGroup.findAll({
      attributes: [
        'id',
        'points',
        'rating',
        'admissionDate',
        'isActive',
        'groupId'
      ],
      where: where,
      include: [
        {
          association: 'user',
          where: { isDelete: false },
          attributes: ['id', 'name', 'lastname']
        }
      ],
      order: [['rating', 'ASC']],
      limit: 10
    });
    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Get plan more used
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getPlanMoreUsed(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId;
    if (authHeader[1]) {
      gymId = authHeader[1];
    } else {
      gymId = paramsValues[0];
    }
    //Query
    let plan = await PlansUsersGroup.findAll({
      attributes: ['planId', [fn('count', col('plan_id')), 'total']],
      where: { isDelete: false },
      include: [
        {
          association: 'payment',
          where: { statusId: 25 },
          attributes: []
        },
        {
          association: 'plan',
          where: { gymId },
          attributes: ['id', 'name']
        }
      ],
      group: [['planId', 'ASC'], 'plan.id'],
      order: [[literal('total'), 'DESC']],
      // raw: true,
      limit: 1
    });
    return plan;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Get plan less used
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getPlanLessUsed(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId;
    if (authHeader[1]) {
      gymId = authHeader[1];
    } else {
      gymId = paramsValues[0];
    }
    //Query
    let plan = await PlansUsersGroup.findAll({
      attributes: ['planId', [fn('count', col('plan_id')), 'total']],
      where: { isDelete: false },
      include: [
        {
          association: 'payment',
          where: { statusId: 25 },
          attributes: []
        },
        {
          association: 'plan',
          where: { gymId },
          attributes: ['id', 'name']
        }
      ],
      group: [['planId', 'ASC'], 'plan.id'],
      order: [[literal('total'), 'ASC']],
      // raw: true,
      limit: 1
    });
    return plan;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Get bank most used
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getBankMoreUsed(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId;
    if (authHeader[1]) {
      gymId = authHeader[1];
    } else {
      gymId = paramsValues[0];
    }
    //Query
    let plan = await Payment.findAll({
      attributes: ['bankId', [fn('count', col('bank_id')), 'total']],
      where: { isDelete: false },
      include: [
        {
          association: 'bank',
          where: { gymId },
          attributes: ['id', 'name']
        }
      ],
      group: [['bankId', 'ASC'], 'bank.id'],
      order: [[literal('total'), 'DESC']],
      // raw: true,
      limit: 1
    });
    return plan;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Get bank less used
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getBankLessUsed(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId;
    if (authHeader[1]) {
      gymId = authHeader[1];
    } else {
      gymId = paramsValues[0];
    }
    //Query
    let plan = await Payment.findAll({
      attributes: ['bankId', [fn('count', col('bank_id')), 'total']],
      where: { isDelete: false },
      include: [
        {
          association: 'bank',
          where: { gymId },
          attributes: ['id', 'name']
        }
      ],
      group: [['bankId', 'ASC'], 'bank.id'],
      order: [[literal('total'), 'ASC']],
      // raw: true,
      limit: 1
    });
    return plan;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Gets disciplines more reserved
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getDisciplineMoreReserve(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId;
    if (authHeader[1]) {
      gymId = authHeader[1];
    } else {
      gymId = paramsValues[0];
    }
    //Query
    let res = await Participant.count({
      where: { isDelete: false, isWaiting: false },
      include: [
        {
          association: 'class',
          include: [
            {
              association: 'discipline',
              where: { gymId }
            }
          ]
        }
      ],
      group: ['class.discipline_id', 'class->discipline.name']
    });
    let maximum = { disciplineId: '', count: 0, name: '' };
    res.map(function(object) {
      if (object.count > maximum.count) {
        maximum.disciplineId = object.disciplineId;
        maximum.count = object.count;
        maximum.name = object.name;
      }
    });
    return maximum;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Gets disciplines less reserved
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getDisciplineLessReserve(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId;
    if (authHeader[1]) {
      gymId = authHeader[1];
    } else {
      gymId = paramsValues[0];
    }
    //Query
    let res = await Participant.count({
      where: { isDelete: false, isWaiting: false },
      include: [
        {
          association: 'class',
          include: [
            {
              association: 'discipline',
              where: { gymId }
            }
          ]
        }
      ],
      group: ['class.discipline_id', 'class->discipline.name']
    });
    let minimun = { disciplineId: '', count: null, name: '' };
    res.map(function(object) {
      if (!minimun.count) {
        minimun.disciplineId = object.disciplineId;
        minimun.count = object.count;
        minimun.name = object.name;
      } else if (object.count < minimun.count) {
        minimun.disciplineId = object.disciplineId;
        minimun.count = object.count;
        minimun.name = object.name;
      }
    });
    return minimun;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Gets top 10 users with most reserved
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getTop10UserWithMoreReserve(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId;
    if (authHeader[1]) {
      gymId = authHeader[1];
    } else {
      gymId = paramsValues[0];
    }
    //Query
    let res = await Participant.findAll({
      attributes: ['userGroupId', [fn('count', col('user_group_id')), 'total']],
      where: { isDelete: false, isWaiting: false },
      include: [
        {
          association: 'usersGroup',
          where: { gymId },
          attributes: ['id', 'isActive'],
          include: [
            {
              association: 'user',
              attributes: ['id', 'name', 'lastname']
            }
          ]
        }
      ],
      group: [['userGroupId', 'ASC'], 'usersGroup.id', 'usersGroup->user.id'],
      order: [[literal('total'), 'DESC']],
      limit: 10
    });

    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Gets top 10 users with most reserved by discipline
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getTop10UserWithMoreReserveByDiscipline(
  locale,
  authHeader,
  paramsValues
) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId;
    if (authHeader[1]) {
      gymId = authHeader[1];
    } else {
      gymId = paramsValues[1];
    }
    let disciplineId = paramsValues[0];
    //Query
    let res = await Participant.findAll({
      attributes: ['userGroupId', [fn('count', col('user_group_id')), 'total']],
      where: { isDelete: false, isWaiting: false },
      include: [
        {
          association: 'usersGroup',
          where: { gymId },
          attributes: ['id', 'isActive'],
          include: [
            {
              association: 'user',
              attributes: ['id', 'name', 'lastname']
            }
          ]
        },
        {
          association: 'class',
          where: { disciplineId },
          attributes: []
        }
      ],
      group: [['userGroupId', 'ASC'], 'usersGroup.id', 'usersGroup->user.id'],
      order: [[literal('total'), 'DESC']],
      limit: 10
    });

    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Gets all reserves group by gym in Range Date
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getCountGymsReserveByDateRange(
  locale,
  authHeader,
  paramsValues
) {
  try {
    i18n.setLocale(locale);
    let startDate = paramsValues[0];
    let endDate = paramsValues[1];

    //Query
    let res = await Participant.count({
      attributes: [col('gym_id', 'gymId')],
      where: { isDelete: false, isWaiting: false },
      include: [
        {
          association: 'class',
          where: { startDate: { [Op.gte]: startDate, [Op.lt]: endDate } }
        },
        {
          association: 'usersGroup'
        }
      ],
      group: ['usersGroup.gym_id']
    });

    res.map(function(object) {
      object.gymId = object.gym_id;
    });

    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Gets all reserves one gym in Range Date
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getCountOneGymReserveByDateRange(
  locale,
  authHeader,
  paramsValues
) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId;
    if (authHeader[1]) {
      gymId = authHeader[1];
    } else {
      gymId = paramsValues[2];
    }
    let startDate = paramsValues[0];
    let endDate = paramsValues[1];

    //Query
    let res = await Participant.count({
      attributes: [col('gym_id', 'gymId')],
      where: { isDelete: false, isWaiting: false },
      include: [
        {
          association: 'class',
          where: { startDate: { [Op.gte]: startDate, [Op.lt]: endDate } }
        },
        {
          association: 'usersGroup',
          where: { gymId }
        }
      ],
      group: ['usersGroup.gym_id']
    });

    res.map(function(object) {
      object.gymId = object.gym_id;
    });

    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}
/**
 * Count range of user's age
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getCountUsersByRangeAge(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId;
    if (authHeader[1]) {
      gymId = authHeader[1];
    } else {
      gymId = paramsValues[0];
    }
    //Query
    let res = await User.findAll({
      attributes: [[fn('AGE', col('birthday')), 'age']],
      include: [
        {
          association: 'usersGroups',
          where: {
            isDelete: false,
            gymId,
            groupId: 10
          },
          attributes: []
        }
      ]
    });
    let ages = {
      '< 19': 0,
      '20 - 29': 0,
      '30 - 39': 0,
      '40 - 49': 0,
      '50 - 59': 0,
      '> 60': 0
    };
    res.map(function(object) {
      let years = object.dataValues.age.years;
      if (years && years <= 19) {
        ages['< 19'] += 1;
      } else if (years && 20 <= years && years <= 29) {
        ages['20 - 29'] += 1;
      } else if (years && 30 <= years && years <= 39) {
        ages['30 - 39'] += 1;
      } else if (years && 40 <= years && years <= 49) {
        ages['40 - 49'] += 1;
      } else if (years && 50 <= years && years <= 59) {
        ages['50 - 59'] += 1;
      } else if (years && 60 <= years) {
        ages['> 60'] += 1;
      }
    });

    return ages;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Count total currency used group by currency
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getCountCurrencyUsed(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId;
    if (authHeader[1]) {
      gymId = authHeader[1];
    } else {
      gymId = paramsValues[0];
    }
    //Query
    let payment = await Payment.findAll({
      attributes: [
        'currencyId',
        [fn('count', col('currency_id')), 'total'],
        [fn('SUM', col('amount')), 'totalSum']
      ],
      where: { statusId: 25 },
      include: [
        {
          association: 'usersGroup',
          where: { gymId },
          attributes: []
        },
        {
          association: 'currency',
          attributes: ['name']
        }
      ],
      group: [['currencyId', 'ASC'], 'currency.id']
    });
    return payment;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Gets all rating of one discipline group by rating
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getCountRatesByDiscipline(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId;
    if (authHeader[1]) {
      gymId = authHeader[1];
    } else {
      gymId = paramsValues[1];
    }
    let disciplineId = paramsValues[0];

    //Query
    let res = await Participant.count({
      where: {
        isDelete: false,
        isWaiting: false,
        [Op.not]: { rating: null }
      },
      include: [
        {
          association: 'class',
          where: { disciplineId },
          include: [
            {
              association: 'discipline',
              where: { gymId }
            }
          ]
        }
      ],
      group: ['Participant.rating']
    });

    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Gets all reserves group by gym in Range Date
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getCountDiscipliensReserveByDateRange(
  locale,
  authHeader,
  paramsValues
) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId;
    if (authHeader[1]) {
      gymId = authHeader[1];
    } else {
      gymId = paramsValues[2];
    }
    let startDate = paramsValues[0];
    let endDate = paramsValues[1];

    //Query
    let disciplines = {};
    let res = await Discipline.findAll({ where: { gymId } });
    res.map(function(object) {
      disciplines[object.id] = object.name;
    });

    res = await Participant.count({
      where: { isDelete: false, isWaiting: false },
      include: [
        {
          association: 'class',
          where: { startDate: { [Op.gte]: startDate, [Op.lt]: endDate } },
          include: [
            {
              association: 'discipline',
              where: { gymId }
            }
          ]
        }
      ],
      group: ['class.discipline_id']
    });

    res.map(function(object) {
      object.name = disciplines[object.discipline_id];
      object.disciplineId = object.discipline_id;
    });

    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

module.exports = {
  getTop10CoachBestRating,
  getTop10CoachWorstRating,
  getPlanMoreUsed,
  getPlanLessUsed,
  getBankMoreUsed,
  getBankLessUsed,
  getDisciplineMoreReserve,
  getDisciplineLessReserve,
  getTop10UserWithMoreReserve,
  getTop10UserWithMoreReserveByDiscipline,
  getCountGymsReserveByDateRange,
  getCountUsersByRangeAge,
  getCountCurrencyUsed,
  getCountRatesByDiscipline,
  getCountDiscipliensReserveByDateRange,
  getCountOneGymReserveByDateRange
};

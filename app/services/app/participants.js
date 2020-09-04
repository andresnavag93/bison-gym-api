/* eslint-disable no-unused-vars */
'use strict';

// Configuration Files
const { emailConfig } = require('../../config/config');
// Internationalization
const i18n = require('../../i18n/i18n');
// Console Debug Information
const debug = require('debug')('bison-backend:services:participants');
// Models
const {
  Participant,
  UsersGroup,
  Class,
  Plan
} = require('../../database/models');
// Sequelize Operations
const { Op } = require('sequelize');
// Better control of Date
const moment = require('moment-timezone');
// Generic Error Message
const { errorMessage } = require('../../utils/errorMessages');
// Emails
const nodeMailer = require('nodemailer');

/**
 * Finds all participant of a class by its id
 * @param {string} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getParticipantsById(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let classId = paramsValues[0];
    let gymId = authHeader[1];

    // Query
    let res = await Participant.findAll({
      attributes: ['id', 'updatedAt', 'createdAt', 'isWaiting', 'rating'],
      where: {
        isDelete: false,
        classId
      },
      include: [
        {
          association: 'usersGroup',
          where: { groupId: 10, gymId, isActive: true, isDelete: false },
          attributes: ['id', 'points', 'rating', 'admissionDate'],
          include: [
            {
              association: 'user',
              attributes: [
                'id',
                'name',
                'lastname',
                'document',
                'email',
                'picture',
                'anonymous'
              ]
            }
          ]
        }
      ],
      order: ['isWaiting', 'updatedAt']
    });

    res.map(function(e) {
      let user = e.usersGroup.user;
      if (user.anonymous) {
        (user.picture = null), (user.name = null), (user.lastname = null);
      }
    });

    return res;
  } catch (e) {
    debug('Error: ', e);
    // Unexpected errors
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Suscribe to a class
 * @param {string} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function postParticipant(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let classId = paramsValues[0];
    let gymId = authHeader[1];
    let userGroupId = authHeader[2];
    let capacity, classInfo;

    ///--------------------------------------------------
    // User Validation:
    // A) Active UserGroup
    // B) Active Plan and Date now < CutDay
    // C) Limit Gym Reserves
    // D) Not be penalized
    //--------------------------------------------------

    // A) Active UserGroup
    let user = await UsersGroup.findOne({
      where: {
        id: userGroupId,
        gymId,
        isActive: true,
        isDelete: false,
        groupId: 10
      },
      include: [
        {
          association: 'plansUsersGroups',
          attributes: ['id', 'cutDay'],
          order: [['createdAt', 'DESC']],
          limit: 1,
          include: [
            {
              association: 'payment',
              attributes: ['id', 'statusId'],
              where: { statusId: 25 }
            },
            {
              association: 'plan',
              attributes: ['id']
            }
          ]
        },
        {
          association: 'gym',
          required: true,
          where: { isDelete: false, isActive: true },
          attributes: [
            'id',
            'createdAt',
            'reserveLimitNumber',
            'minDaysReserve'
          ]
        },
        {
          association: 'penalties',
          required: false,
          where: { isDelete: false },
          attributes: ['id', 'endDate'],
          order: [['endDate', 'DESC']],
          limit: 1
        }
      ]
    });

    if (user === null) {
      return errorMessage(i18n.__('users.notFound'), 404);
    }
    //D) Not be penalized
    let now = new Date();
    if (user.penalties[0]) {
      let endDate = user.penalties[0].endDate;
      if (now <= endDate) {
        return errorMessage(i18n.__('users.penalized'), 444);
      }
    }
    //B) Active Plan and Date now < CutDay
    if (user.plansUsersGroups[0]) {
      let cutDay = user.plansUsersGroups[0].cutDay;
      if (cutDay <= now) {
        return errorMessage(i18n.__('plans.expired'), 444);
      }
    } else {
      return errorMessage(i18n.__('plans.notActive'), 444);
    }

    // C) Limit Gym Reserves
    let skip = false;
    let createdAt = moment(user.gym.createdAt).utc();
    while (!skip) {
      let nextDate = moment(createdAt.format())
        .utc()
        .add(1, 'M');
      if (nextDate <= now) {
        createdAt = nextDate;
      } else {
        skip = true;
      }
    }

    let count = await Participant.count({
      where: {
        createdAt: { [Op.gte]: createdAt.format() },
        isDelete: false,
        isWaiting: false
      }
    });

    if (count >= user.gym.reserveLimitNumber) {
      return errorMessage(i18n.__('gyms.exceedLimit'), 444);
    }

    ///--------------------------------------------------
    // Reserve Validation:
    // A) Classes StartDate < Cutday
    // B) Minimum days for reserve a class in the futures
    // C) Cannot reserve two clases at the same time
    // D) The class need to belong to discipline and schedule specific
    //--------------------------------------------------

    classInfo = await Class.findOne({
      where: { id: classId, isDelete: false }
    });
    if (classInfo === null) {
      return errorMessage(i18n.__('classes.notFound'), 404);
    }
    let planInfo = await Plan.findOne({
      where: { id: user.plansUsersGroups[0].plan.id, isDelete: false },
      include: [
        {
          association: 'hours',
          where: { dayId: classInfo.startDate.getDay() + 14 },
          attributes: ['id', 'dayId', 'startHour', 'endHour']
        },
        {
          association: 'disciplinesPlans',
          where: { disciplineId: classInfo.disciplineId },
          attributes: ['id', 'disciplineId']
        }
      ]
    });
    //D) The class need to belong to discipline and schedule specific
    if (planInfo) {
      let hour = planInfo.hours[0];
      let startTime =
        hour.startHour.getMinutes() + hour.startHour.getHours() * 60;
      let classTime =
        classInfo.startDate.getMinutes() + classInfo.startDate.getHours() * 60;
      let endTime = hour.endHour.getMinutes() + hour.endHour.getHours() * 60;
      if (!(startTime <= classTime && classTime <= endTime)) {
        return errorMessage(i18n.__('reserves.outOfYourPlan'), 444);
      }
    } else {
      return errorMessage(i18n.__('reserves.classDontBelongs'), 444);
    }

    //A) Classes StartDate < Cutday
    if (classInfo.startDate >= user.plansUsersGroups[0].cutDay) {
      return errorMessage(i18n.__('reserves.exceedCutDay'), 444);
      //B) Minimum days for reserve a class in the futures
    } else {
      let nowTime = now.getTime();
      let classStartTime = classInfo.startDate.getTime();
      let days = (classStartTime - nowTime) / (1000 * 60 * 60 * 24);
      let minDaysReserve = user.gym.minDaysReserve;

      if (days < 0) {
        return errorMessage(i18n.__('reserves.classIsOver'), 444);
      } else if (days >= minDaysReserve) {
        return errorMessage(i18n.__('reserves.classMinDaysReserve'), 444);
      }
    }

    let reserves = await Participant.findAll({
      where: { isDelete: false, userGroupId, [Op.not]: { classId } },
      include: [
        {
          association: 'class',
          where: {
            [Op.or]: {
              startDate: {
                [Op.gte]: classInfo.startDate,
                [Op.lt]: classInfo.endDate
              },
              endDate: {
                [Op.gt]: classInfo.startDate,
                [Op.lte]: classInfo.endDate
              }
            }
          }
        }
      ]
    });

    //C) Cannot reserve two clases at the same time
    if (reserves.length > 0) {
      return errorMessage(i18n.__('reserves.anotherClass'), 444);
    }

    ///--------------------------------------------------
    // Reserve
    //--------------------------------------------------
    if (classInfo.capacity) {
      capacity = classInfo.capacity;
    } else if (classInfo.room) {
      capacity = classInfo.room.capacity;
    }
    let participant = await Participant.findOne({
      where: { userGroupId, classId },
      include: [{ association: 'class', include: [{ association: 'room' }] }]
    });

    // if user exists
    if (participant !== null) {
      // if user is eliminated
      if (participant.isDelete === true) {
        // Check class participants capacity
        let participants = await participant.class.getParticipants({
          attributes: ['id', 'isDelete', 'classId'],
          where: {
            isDelete: false,
            classId
          },
          include: [
            {
              attributes: ['id', 'groupId'],
              association: 'usersGroup',
              where: { groupId: 10 }
            }
          ],
          order: ['isWaiting', 'updatedAt']
        });
        let msg;
        //If Capacity is greater than
        if (participants.length >= capacity) {
          participant.isWaiting = true;
          msg = i18n.__('reserves.suscribeWaitingList');
        }
        //If Capacity is less than
        else {
          participant.isWaiting = false;
          msg = i18n.__('reserves.suscribe');
        }
        participant.isDelete = false;
        await participant.save();
        return { success: { id: participant.id, msg }, code: 201 };
        // Ignore is already exists
      } else {
        return errorMessage(i18n.__('reserves.reserved'), 404);
      }
      //If user not exists
    } else {
      // Check class participants capacity
      let participants = await Participant.findAll({
        attributes: ['id', 'updatedAt', 'createdAt', 'isWaiting'],
        where: {
          isDelete: false,
          classId
        },
        include: [
          {
            association: 'usersGroup',
            where: { groupId: 10, isDelete: false, isActive: true }
          }
        ],
        order: ['isWaiting', 'updatedAt']
      });
      let isWaiting;
      let msg;
      //If Capacity is greater than
      if (participants.length >= capacity) {
        isWaiting = true;
        msg = i18n.__('reserves.suscribeWaitingList');
      }
      //If Capacity is less than
      else {
        isWaiting = false;
        msg = i18n.__('reserves.suscribe');
      }
      // Create new reserve
      let res = await Participant.create({
        classId,
        userGroupId,
        isWaiting,
        isDelete: false
      });
      return { success: { id: res.id, msg }, code: 201 };
    }
  } catch (e) {
    debug('Error: ', e);
    // Unexpected errors
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Cancel a class
 * @param {string} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function deleteParticipant(locale, authHeader, paramsValues) {
  // Set user locale
  i18n.setLocale(locale);
  let classId = paramsValues[0];
  let gymId = authHeader[1];
  let userGroupId = authHeader[2];

  try {
    let participant = await Participant.findOne({
      where: { userGroupId, classId },
      include: [
        {
          association: 'usersGroup',
          attributes: ['id', 'gymId'],
          where: { gymId, isDelete: false, isActive: true, groupId: 10 }
        },
        {
          association: 'class',
          include: [{ association: 'room' }, { association: 'discipline' }]
        }
      ]
    });
    // If user exists
    if (participant !== null) {
      // If not eliminated
      let startDate = moment(participant.class.startDate).utc();
      let dateNow = moment(new Date())
        .utc()
        .add(1, 'hours');
      if (startDate.diff(dateNow) < 0) {
        return errorMessage(i18n.__('reserves.cannotEliminate'), 404);
      } else {
        if (participant.isDelete !== true) {
          participant.isWaiting = false;
          participant.isDelete = true;
          await participant.save();

          //Check class capacity
          let participants = await participant.class.getParticipants({
            where: {
              isDelete: false,
              classId
            },
            include: [
              {
                association: 'usersGroup',
                where: { groupId: 10, isDelete: false, isActive: true },
                include: [
                  {
                    association: 'user',
                    attributes: ['id', 'email']
                  }
                ]
              }
            ],
            order: ['isWaiting', 'updatedAt']
          });

          let capacity;
          if (participant.class.capacity) {
            capacity = participant.class.capacity;
          } else if (participant.class.room) {
            capacity = participant.class.room.capacity;
          }
          //Id capactity is greater than
          let lastParticipant = participants[capacity - 1];
          if (lastParticipant !== undefined && lastParticipant !== null) {
            if (lastParticipant.isWaiting) {
              lastParticipant.isWaiting = false;
              await lastParticipant.save();

              // Send email with token
              let transporter = nodeMailer.createTransport(emailConfig);

              // Email Structure
              let mailOptions = {
                from: 'no-replay@bisonreserve.com',
                to: lastParticipant.usersGroup.user.email,
                subject: `[Bison] - ${i18n.__(
                  'reserves.suscribe-class.email-title'
                )}`,
                html: `<br><b>${i18n.__(
                  'reserves.suscribe-class.message.1'
                )}</b><br><br>
              <b>${i18n.__('reserves.suscribe-class.message.2')}</b><br>
              ${participant.class.discipline.name}<br><br><br>
              <b>${i18n.__('reserves.suscribe-class.message.3')}</b><br>
            ${participant.class.startDate}<br>`
              };
              // If email has been sent notify user
              await transporter.sendMail(mailOptions);
            }
          }
          return { success: {}, code: 201 };

          //  If not eliminated
        } else {
          return errorMessage(i18n.__('reserves.alreadyEliminated'), 404);
        }
      }

      //If not exists
    } else {
      return errorMessage(i18n.__('reserves.notFound'), 404);
    }
  } catch (e) {
    debug('Error: ', e);
    // Unexpected errors
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Rate class reserved
 * @param {string} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function putRateParticipantClass(locale, authHeader, paramsValues) {
  // Set user locale
  i18n.setLocale(locale);
  let classId = paramsValues[0];
  let object = paramsValues[1];
  let gymId = authHeader[1];
  let userGroupId = authHeader[2];

  ///--------------------------------------------------
  // User Validation For Rate:
  // A) Active UserGroup
  // B) Class endDate < Current DateTime
  //--------------------------------------------------

  let currentDate = new Date();
  let participant = await Participant.findOne({
    where: {
      userGroupId,
      classId,
      isDelete: false
    },
    include: [
      {
        association: 'class',
        where: {
          isDelete: false,
          endDate: {
            [Op.lt]: currentDate // B)
          }
        },
        include: [
          {
            association: 'discipline',
            where: {
              isDelete: false,
              gymId
            }
          },
          {
            association: 'coaches',
            where: {
              isDelete: false
            },
            include: [
              {
                association: 'usersGroup'
              }
            ]
          }
        ]
      },
      {
        association: 'usersGroup', // A)
        where: {
          isDelete: false,
          isActive: true,
          gymId
        }
      }
    ]
  });

  // Attribute not found
  if (participant === null) {
    return errorMessage(i18n.__('reserves.cannotRateYet'), 444);
  }

  ///--------------------------------------------------
  // Update Reserve with Rating
  // A) Class has rating null to Set Participant Rate
  // B) Update Actual Class Rating
  // C) Update Coach Rating
  // D) Update Discipline Rating
  //--------------------------------------------------

  var rating, ratingCount, ratingSum;
  //A
  if (participant.rating === null || participant.rating === 0) {
    await participant.update({
      rating: object.rating
    });
  } else {
    return errorMessage(i18n.__('reserves.alreadyRate'), 444);
  }

  //B
  let classInfo = participant.class;
  if (classInfo.ratingCount === null || classInfo.ratingCount === 0) {
    await classInfo.update({
      rating: object.rating,
      ratingCount: 1,
      ratingSum: object.rating
    });
  } else {
    ratingSum = classInfo.ratingSum + object.rating;
    ratingCount = classInfo.ratingCount + 1;
    await classInfo.update({
      rating: Number((ratingSum / ratingCount).toFixed(1)),
      ratingCount,
      ratingSum
    });
  }

  //D
  let discipline = participant.class.discipline;
  if (discipline.ratingCount === null || discipline.ratingCount === 0) {
    await discipline.update({
      rating: object.rating,
      ratingCount: 1,
      ratingSum: object.rating
    });
  } else {
    ratingSum = discipline.ratingSum + object.rating;
    ratingCount = discipline.ratingCount + 1;
    await discipline.update({
      rating: Number((ratingSum / ratingCount).toFixed(1)),
      ratingCount,
      ratingSum
    });
  }

  //C
  let coach = participant.class.coaches[0].usersGroup;
  if (coach.ratingCount === null || coach.ratingCount === 0) {
    ratingSum = object.rating;
    ratingCount = 1;
    rating = object.rating;
    await coach.update({
      rating: object.rating,
      ratingCount: 1,
      ratingSum: object.rating
    });
  } else {
    ratingSum = coach.ratingSum + object.rating;
    ratingCount = coach.ratingCount + 1;
    rating = Number((ratingSum / ratingCount).toFixed(1));
    await coach.update({
      rating,
      ratingCount,
      ratingSum
    });
  }

  return { success: {}, code: 201 };
}

/**
 * Rate gyms
 * @param {string} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function putRateToGym(locale, authHeader, paramsValues) {
  // Set user locale
  i18n.setLocale(locale);
  let object = paramsValues[0];
  let gymId = authHeader[1];
  let id = authHeader[2];

  // Query
  let user = await UsersGroup.findOne({
    where: {
      id,
      gymId,
      groupId: 10,
      isActive: true,
      isDelete: false,
      gymRating: null
    },
    include: [{ association: 'gym' }]
  });
  // Not found
  if (user === null) {
    return errorMessage(i18n.__('users.alreadyRated'), 404);
  }

  ///--------------------------------------------------
  // Update Reserve with Rating
  // A) Users has gym rating null to Set Participant Rate
  // B) Update Gym
  //--------------------------------------------------

  var ratingCount, ratingSum;
  //A
  if (user.gymRating === null) {
    await user.update({
      gymRating: object.rating
    });
  } else {
    return errorMessage(i18n.__('users.alreadyRated'), 444);
  }

  //B
  let gym = user.gym;
  if (gym.ratingCount === null || gym.ratingCount === 0) {
    await gym.update({
      rating: object.rating,
      ratingCount: 1,
      ratingSum: object.rating
    });
  } else {
    ratingSum = gym.ratingSum + object.rating;
    ratingCount = gym.ratingCount + 1;
    await gym.update({
      rating: Number((ratingSum / ratingCount).toFixed(1)),
      ratingCount,
      ratingSum
    });
  }

  return { success: {}, code: 201 };
}
module.exports = {
  getParticipantsById,
  postParticipant,
  deleteParticipant,
  putRateParticipantClass,
  putRateToGym
};

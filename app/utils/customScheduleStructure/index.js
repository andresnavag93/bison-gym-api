// Sequelize Operations
const { Op } = require('sequelize');
// Better control of Date
const moment = require('moment-timezone');
// Utils
const shared = require('../../services/shared');
// Schema
const schema = require('../../schemas/classes');

/**
 * Array of objects with hours this is use for create multi class
 *
 * @param {*} array
 * @returns
 */
function customStructureStartDate(array) {
  let list = [];
  let object = null;
  array.map(function(e) {
    object = { [Op.gte]: e.startDate, [Op.lt]: e.endDate };
    list.push(object);
  });
  return list;
}

/**
 * Array of objects with hours this is use for create multi class
 *
 * @param {*} array
 * @returns
 */
function customStructureEndDate(array) {
  let list = [];
  let object = null;
  array.map(function(e) {
    object = { [Op.gt]: e.startDate, [Op.lte]: e.endDate };
    list.push(object);
  });
  return list;
}

/**
 * Array of objects with hours this is use for create multi class
 *
 * @param {*} array
 * @returns
 */
function validScheduleStructure(array) {
  let startDate, endDate;
  var valid = true;
  schema['required'] = ['startDate', 'endDate'];
  array.map(function(e) {
    try {
      let res = shared.checkSchema(e, schema);
      if (typeof res === 'object') {
        valid = false;
      } else {
        startDate = moment(e.startDate).utc();
        endDate = moment(e.endDate).utc();
        if (endDate <= startDate) {
          valid = false;
        } else if (startDate < new Date()) {
          valid = false;
        }
      }
    } catch (e) {
      valid = false;
    }
  });
  return valid;
}

module.exports = {
  customStructureStartDate,
  customStructureEndDate,
  validScheduleStructure
};

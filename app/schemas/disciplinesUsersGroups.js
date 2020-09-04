'use strict';

// DisciplineUserGroup JSON Schema
const DisciplineUserGroup = {
  $id: 'disciplines_users_groupss',
  type: 'object',
  required: ['userGroupId', 'disciplineId'],
  anyOf: [
    {
      additionalProperties: true,
      properties: {
        id: {
          type: 'integer'
        },
        userGroupId: {
          type: 'integer'
        },
        disciplineId: {
          type: 'integer'
        }
      }
    }
  ]
};

module.exports = DisciplineUserGroup;

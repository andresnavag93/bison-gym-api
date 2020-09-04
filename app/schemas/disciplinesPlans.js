'use strict';

// DisciplinePlan JSON Schema
const DisciplinePlan = {
  $id: 'disciplines_plans',
  type: 'object',
  required: ['planId', 'disciplineId'],
  anyOf: [
    {
      additionalProperties: true,
      properties: {
        id: {
          type: 'integer'
        },
        planId: {
          type: 'integer'
        },
        disciplineId: {
          type: 'integer'
        },
        tickets: {
          type: 'integer'
        }
      }
    }
  ]
};

module.exports = DisciplinePlan;

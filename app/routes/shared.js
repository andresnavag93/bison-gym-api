'use strict'

/**
 * @swagger
 * securityDefinitions:
 *  Authorization:
 *    type: apiKey
 *    in: header
 *    name: Authorization
 */

/**
 * @swagger
 * definitions:
 *  resType:
 *    produces:
 *      - application/json
 *  authorization:
 *    security:
 *      - Authorization: []
 *  langParam:
 *    parameters:
 *      - name: Accept-Language
 *        in: header
 *        description: Language to error responses
 *        type: string
 *  authParam:
 *    parameters:
 *    - name: Authorization
 *      in: header
 *      description: Authorization Token. Should include 'Bearer ' before the token (including blank space)
 *      type: string
 *      required: true
 *  errorOnlyMsg:
 *    type: object
 *    properties:
 *      error:
 *        type: object
 *        required:
 *        - msg
 *        properties:
 *          msg:
 *            type: string
 *  errorComplete:
 *    type: object
 *    properties:
 *      error:
 *        type: object
 *        properties:
 *          field:
 *            type: object
 *            required:
 *            - msg
 *            properties:
 *              value:
 *                type: string
 *                example: field data type
 *              msg:
 *                type: string
 *  unauthorizedResponse:
 *    type: object
 *    properties:
 *      error:
 *        type: object
 *        properties:
 *          token:
 *            type: object
 *            properties:
 *              value:
 *                type: string
 *              msg:
 *                type: string
 *  idAttribute:
 *    type: object
 *    required:
 *    - id
 *    properties:
 *      id:
 *        type: int
 *        format: int32
 *        example: 4546
 */

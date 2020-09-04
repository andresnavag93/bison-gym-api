/* eslint-disable no-unused-vars */
const config = require('../../config/config');
var path = require('path');

/**
 * Send email templates
 *
 * @param {*} to
 * @param {*} template
 * @param {*} locals
 * @returns
 */
function sendEmail(to, template, locals = {}) {
  const Email = require('email-templates');
  const email = new Email({
    juice: true,
    juiceResources: {
      preserveImportant: true,
      webResources: {
        relativeTo: path.resolve('assets')
      }
    },
    message: {
      from: 'no-reply@bisonreserve.com'
    },
    transport: config.emailConfig
  });
  email
    .send({
      template: template,
      message: {
        to: to
      },
      locals: locals
    })
    .then(info => {
      // console.log(info);
    })
    .catch(console.error);
}

module.exports = {
  sendEmail
};

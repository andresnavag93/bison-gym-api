'use strict'

/** i18n Configuration */
const i18n = require('i18n')
i18n.configure({
  locales: ['en', 'es'],
  directory: './app/i18n/locales',
  objectNotation: true
})

module.exports = i18n

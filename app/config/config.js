'use strict';

// Load .env file
const dotenv = require('dotenv');
dotenv.config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,

  // Default locale
  locale: 'es',

  // JWT Secret
  JWT_KEY_ADMIN: process.env.JWT_KEY_ADMIN || '',
  JWT_KEY_APP: process.env.JWT_KEY_APP || '',

  PERMISOLOGIES: process.env.PERMISOLOGIES || 0,

  // Email configuration
  emailConfig: {
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.AWS_ACCESS_KEY_ID || '',
      pass: process.env.AWS_SECRET_ACCESS_KEY || ''
    }
  },

  //Aws SDK
  AWS: {
    S3_REGION: process.env.S3_REGION || '',
    S3_KEY: process.env.S3_KEY || '',
    S3_SECRET_KEY: process.env.S3_SECRET_KEY || '',
    S3_BUCKET: process.env.S3_BUCKET || 'media.bison-reserve-dev',
    S3_URL:
      process.env.S3_URL || 'https://s3.amazonaws.com/media.bison-reserve-dev/'
  },
  attributesRootIds: {
    usersRoles: 1,
    hoursDays: 2,
    classesType: 3,
    securityCodesType: 4,
    paymentStatus: 5,
    currencyTypes: 6,
    newsTpes: 7,
    mediaTypes: 8,
    addonsTypes: 9
  },
  usersGroupsIds: {
    client: 10,
    coach: 11
  },
  hoursDaysIds: {
    sunday: 14,
    monday: 15,
    tuesday: 16,
    wednesday: 17,
    thursday: 18,
    friday: 19,
    saturday: 20
  },
  securityCodesIds: {
    recoveryPassword: 23
  },
  paymentStatusIds: {
    pendig: 24,
    accepted: 25,
    rejected: 26
  },

  currencyIds: {
    usd: 27,
    bs: 28,
    eu: 29
  },
  newsTypeIds: {
    notification: 30
  },
  mediaTypeIds: {
    picture: 31
  }
};

module.exports = config;

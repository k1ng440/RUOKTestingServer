'use strict';

module.exports = {
  app: {
    title: 'User',
    description: '',
    version:0.1
  },
  port: process.env.PORT || 8081,
  host: process.env.HOST || '0.0.0.0',
  // sessionSecret should be changed for security measures and concerns
  tokenSecret: process.env.SESSION_SECRET || 'techuz',
  expiresIn : 86400, // expires in 24 hours
  loginLimit: {
    maxTime: 60*1000, // 1 minit
    maxAttempt: 5, // maximum attempt in given time
  }
};

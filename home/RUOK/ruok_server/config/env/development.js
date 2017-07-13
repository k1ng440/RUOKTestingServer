'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
  app: {
    title: defaultEnvConfig.app.title + ' - Development Environment'
  },
  MongoDB: {
    host: "127.0.0.1",
    port: "27017",
    dbname: "patient",
    options: {
      username: '',
      password: ''
    }
  },
  clientUrl: 'http://127.0.0.1:8081',
  twilio: {
    sid: 'AC1aefa51f08c852d5ab17e807ab609f59',
    token: '74534ee72560c0ef36383feba8280489',
    mobile: '5309992633',
    countryCode: '+1'
  }
};

'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
  secure: {
    ssl: false,
    privateKey: '',
    certificate: '',
    caBundle: ''
  },
  app: {
    title: defaultEnvConfig.app.title + ' - Production Environment'
  },
  MongoDB: {
    host: "138.197.236.252",
    port: "4200",
    dbname: "patient",
    options: {
      username: '',
      password: ''
    }
  },
  clientUrl: '138.197.236.252:8080',
  twilio: {
    sid: 'AC1aefa51f08c852d5ab17e807ab609f59',
    token: '74534ee72560c0ef36383feba8280489',
    mobile: 'sandslkad'//5309992633
  }
};

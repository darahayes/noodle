var _ = require('lodash');
var Joi = require('joi');
var Boom = require('boom');

exports.register = function(server, options, next) {
  options = {
    basePath: '/static'
  };

  var routes = [

  ];

  server.route(routes);
  next();
};

exports.register.attributes = {
  name: 'api-static-assets'
};
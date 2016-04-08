var _ = require('lodash');
var Joi = require('joi');
var Boom = require('boom');

exports.register = function(server, options, next) {
  options = {
    basePath: '/api/exercises'
  };

  var routes = [{
    method: 'POST',
    path: options.basePath,
    config: {
      handler: save_event_form
    }
  }, {
    method: 'GET',
    path: options.basePath,
    config: {
      handler: list_event_forms
    }
  }, {
    method: 'DELETE',
    path: options.basePath,
    config: {
      handler: remove_event_form
    }
  }];

  function save_event_form(request, reply) {
    console.log('\n\n\n\nPARAMS\n\n\n\n', request.payload);
    var msg = _.extend({
      role: 'exercises',
      cmd: 'save',
      created_by: request.auth.credentials.user
    }, request.payload);
    request.seneca.act(msg, function(err, out) {
      if (err) return reply(Boom.expectationFailed('Error Saving Exercise'));
      return reply(out);
    });
  }

  function list_event_forms(request, reply) {
    var user = (request.auth.credentials) ? request.auth.credentials.user : null
    return reply.act({
      role: 'exercises',
      cmd: 'list',
      created_by: user
    });
  }

  function remove_event_form(request, reply) {
    return reply.act({
      role: 'exercises',
      cmd: 'remove_exercises',
      user: request.auth.credentials.user
    });
  }

  server.route(routes);
  next();
};

exports.register.attributes = {
  name: 'api-event-forms-service'
};
var _ = require('lodash');
var Joi = require('joi');
var Boom = require('boom');

exports.register = function(server, options, next) {
  options = {
    basePath: '/api/events'
  };

  var routes = [
    {
      method: 'POST',
      path: options.basePath,
      config: {
        handler: save_event_form
      }
    },
    {
      method: 'PUT',
      path: options.basePath,
      config: {
        handler: update_event_form
      }
    },
    {
      method: 'GET',
      path: options.basePath,
      config: {
        handler: list_event_forms
      }
    },
    {
      method: 'DELETE',
      path: options.basePath,
      config: {
        handler: remove_event_form,
        validate: {
          query: {
            id : Joi.string().required()
          }
        }
      }
    }
  ];

  function update_event_form(request, reply) {
    console.log('Update Event');
    var event = request.payload;
    request.seneca.make('sys/events').load$({id: event.id}, (err, entity) => {
      if (err) { 
        reply(Boom.notFound('Event not Found'));
      } else {
        event.lastModified = new Date();
        entity.data$(event);
        entity.save$(function(err, saved) {
          if (err) {
            console.log(err);
            return reply(Boom.expectationFailed('An error occurred'));
          }
          console.log('Entity Updated', saved);
          reply(saved);
        })
      }
    })
  }

  function save_event_form(request, reply) {
    var event = request.payload;
    event.lastModified = new Date();
    request.seneca.make('sys/events').data$(request.payload).save$((err, saved) => {
      console.log('saved', saved)
      if (err) { return reply(err) }
        return reply(saved);
    })
  }

  function list_event_forms(request, reply) {
    request.seneca.make('sys/events').list$((err, result) => {
      if (err) { return reply(err) }
        console.log(result);
        return reply(result);
    });
  }

  function remove_event_form(request, reply) {
    console.log('Remove event');
    var event_id = request.query.id;
    request.seneca.make('sys/events').remove$({id: event_id}, (err, result) => {
      if (err) { return reply(err) }
        console.log(result)
        return reply(result);
    });
  }

  server.route(routes);
  next();
};

exports.register.attributes = {
  name: 'api-event-forms-service'
};
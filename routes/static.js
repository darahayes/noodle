exports.register = function(server, options, next) {
  
  server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
          directory: {
              path: '../public',
              listing: true,
              index: ['index.html']
          }
      }
  });

  next();
};

exports.register.attributes = {
  name: 'api-static-assets'
};
const Hapi = require('hapi');
const Chairo = require('chairo');
const Inert = require('inert');
const Bell = require('bell');
const Hapi_Cookie = require('hapi-auth-cookie');
const Options = require('./config');

//connection Options
const server = new Hapi.Server(Options.serverConfig);

server.connection(Options.connectionConfig);

// Register plugins
const plugins = [
  {
    register: Chairo
  },
  {
    register: Inert
  },
  {
    register: Bell
  },
  {
    register: Hapi_Cookie
  }
];

server.register(plugins, (err) => {
  checkHapiPluginError(err);
  const seneca = server.seneca;

  seneca
    .use('mongo-store', Options.mongo)
    .use('user')
    .use('auth', {restrict: '/api'})

  seneca.ready((err) => {
    server.register(require('./routes/event_forms'), (err) => {
      checkHapiPluginError(err);
    });

    server.register(require('./routes/static'), (err) => {
      checkHapiPluginError(err);
    });

    server.start(() => {
      console.log('Server running at:', server.info.uri);
    });
  });
});


function checkHapiPluginError(error) {
  if (error) {
    console.log('An error occurred while loading a hapi plugin');
    throw error;
  }
}
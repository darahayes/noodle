const Inert = require('inert');
const Chairo = require('chairo');
const Hapi = require('hapi');
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
  }
];

server.register(plugins, (err) => {
  checkHapiPluginError(err);
  const seneca = server.seneca;

  seneca
    .use('mongo-store', Options.mongo)
    .use('user');

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
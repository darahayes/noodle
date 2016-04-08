const Path = require('path');

module.exports = {
  mongo: {
    name: 'progress',
    host: '127.0.0.1',
    port: 27017
  },
  serverConfig: {
    connections: {
      routes: {
        files: {
          relativeTo: Path.join(__dirname, 'public')
        }
      }
    }
  },
  connectionConfig: {
    port: 4000,
    routes: {
      cors: {
        additionalExposedHeaders: ['Authorization', 'authorization'],
        credentials: true
      }
    }
  }
};
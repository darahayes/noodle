const Path = require('path');

module.exports = {
  mongo: {
    name: 'noodle',
    host: process.env.MONGO_HOST: '127.0.0.1',
    port: process.env.MONGO_PORT: 27017
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
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 4000,
    routes: {
      cors: {
        additionalExposedHeaders: ['Authorization', 'authorization'],
        credentials: true
      }
    }
  }
};
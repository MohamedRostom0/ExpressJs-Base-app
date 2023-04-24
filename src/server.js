import _ from 'lodash';
import http from 'http';
import serversRegistry from './server-registry';
import app from './app';
import { Logger } from './common/lib';

const LOGGER_MODULE_INFO = { module: 'http-server' };

export const initHttpServer = () => {
  if (_.isNil(serversRegistry.http)) {
    const server = http.createServer(app);

    // Log if server fails.
    server.on('error', err => Logger.fatal(err.message, { ...LOGGER_MODULE_INFO, err, stack: err.stack }));

    // Log when server starts listening or when it fails to listen.
    server.on('listening', err => {
      if (_.isNil(err)) {
        Logger.info(`Server started on port ${process.env.PORT}`, LOGGER_MODULE_INFO);
      } else {
        Logger.fatal(err.message, { ...LOGGER_MODULE_INFO, err, stack: err.stack });
      }
    });

    serversRegistry.http = server;
  }
};

import mongoose from 'mongoose';
import { config, MongooseConnectionOptions } from './common/config';
import { Logger } from './common/lib';
import { initHttpServer } from './server';
import serversRegistry from './server-registry';

const LOGGER_MODULE_INFO = { module: 'index' };
const { MONGO_URI, PORT } = config;

mongoose.connect(MONGO_URI, MongooseConnectionOptions)
  .then(async () => {
    initHttpServer();
    serversRegistry.http.listen(PORT);

    // TODO Attach Graceful shutdown on serversRegistry.http
  })
  .catch(error => {
    Logger.error('Failed to start the application', { ...LOGGER_MODULE_INFO, error, message: error.message });
    throw error;
  });

process.on(
  'uncaughtException',
  err => Logger.fatal(err.message, { ...LOGGER_MODULE_INFO, stack: err.stack, err })
);

import _ from 'lodash';
import winston from 'winston';
import * as Sentry from '@sentry/node';
import transports from './transports';
import { config } from '../../config';
import { customLevels } from './levels';

/* eslint-disable import/first */
// require('dotenv').config();

const winstonLogger = winston.createLogger({
  level: config.LOG_LEVEL || 'info',
  levels: customLevels.levels,
  transports,
});

winston.addColors(customLevels.colors);

const logHTTP = message => winstonLogger.info(message, { module: 'MORGAN', layer: 'HTTP' });

const Logger = {
  stream: {
    write(message, encoding) {
      logHTTP(message);
    },
  },

  fatal(message, options) {
    if (!_.isNil(options?.err)) { Sentry.captureException(options.err); }
    if (!_.isNil(options?.error)) { Sentry.captureException(options.error); }

    winstonLogger.fatal(message, options);
  },

  error(message, options) {
    winstonLogger.error(message, options);
  },

  warn(message, options) {
    winstonLogger.warn(message, options);
  },

  info(message, options) {
    winstonLogger.info(message, options);
  },

  debug(message, options) {
    winstonLogger.debug(message, options);
  },
};

export default Logger;

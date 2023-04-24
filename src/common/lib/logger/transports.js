/* eslint-disable import/first */
import winston from 'winston';

import { consoleFormatter } from './formatters.js';

const transports = [
  // Write to STDOUT !
  new winston.transports.Console({ format: consoleFormatter }),
];

export default transports;

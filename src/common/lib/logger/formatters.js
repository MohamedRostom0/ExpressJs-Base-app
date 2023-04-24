import { format } from 'winston';
import { config } from '../../config';
import { NODE_ENV_TESTING } from '../../constants';


/**
 * Custom formatter, ignoring all docs http requests from logs
 */
const filterDocRequests = format((info, opts) => {
  // Skip logging if the requested url is docs related
  if (info.module === 'MORGAN') {
    const messageObject = JSON.parse(info.message);
    const { url } = messageObject;

    if (/^\/docs/.test(url)) { return false; }
  }

  return info;
});

/**
 *  Custom formatter used to avoid any logs made by our testing environment (jest)
 */
const filterTestingRequest = format((info, opts) => {
  if (config.NODE_ENV === NODE_ENV_TESTING) { return false; }
  return info;
});

/**
 * Custom formatter, assign default values to optional info fields
 */
const normalizeInfo = format((info, opts) => {
  /* eslint-disable no-param-reassign */
  info.module = info.module || 'N/A';
  info.layer = info.layer || 'N/A';
  /* eslint-enable no-param-reassign */

  return info;
});

/* eslint-disable no-param-reassign */
const morganLogsFormatter = format((info, opts) => {
  // Handle morgan logs That represent an API request
  if (info.module === 'MORGAN') {
    const messageObject = JSON.parse(info.message);

    info.message = `${messageObject.method}: ${messageObject.url}`;
    info = { ...info, ...messageObject };
  }

  return info;
});

// morgan logs to the console directly, ignore console logs from morgan
const ignoreMorganLogs = format((info, opts) => (info.module === 'MORGAN' ? false : info));

export const fileFormatter = format.combine(
  filterTestingRequest(),
  format.timestamp(),
  format.uncolorize(),
  filterDocRequests(),
  normalizeInfo(),
  format.json()
);

export const logDNAFileFormatter = format.combine(
  filterTestingRequest(),
  format.timestamp(),
  format.uncolorize(),
  filterDocRequests(),
  normalizeInfo(),
  morganLogsFormatter()
);

export const consoleFormatter = format.combine(
  format.colorize(),
  normalizeInfo(),
  format.timestamp(),
  filterDocRequests(),
  ignoreMorganLogs(),
  format.printf(({
    timestamp,
    level,
    module,
    layer,
    message,
    stack,
    metadata,
  }) => {
    let printedMessage = `${timestamp} [${level}] [${module} -> ${layer}]: ${message}`;

    if (metadata) {
      printedMessage += ` \n Metadata --> ${JSON.stringify(metadata, null, 2)}`;
    }

    if (stack) {
      printedMessage += `\n ${stack}`;
    }

    return `${printedMessage}\n`;
  })
);

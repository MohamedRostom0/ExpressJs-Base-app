import _ from 'lodash';
import mongoose from 'mongoose';
import multer from 'multer';
import httpStatus from 'http-status';
import { parseRequestUser } from '../helpers';
import { removeNullFields, stringifyFields } from '../helpers/utils';
import { APIError, sanitize } from '../lib';
import Logger from '../lib/logger';


const LOGGER_MODULE_INFO = { module: 'express-app', layer: 'express-app' };

export const errorHandler = (err, req, res, next) => {
  // Used to label the different types of errors in the logs
  let errorType = 'API';
  // ========== Handle known errors ==========
  // Wrap mongoose errors and report BAD_REQUEST
  if (err instanceof mongoose.Error.ValidationError) {
    errorType = 'mongo';
    // eslint-disable-next-line no-param-reassign
    err = new APIError({ message: err.message, status: httpStatus.BAD_REQUEST });
  }

  // Wrap multer errors and report BAD_REQUEST
  if (err instanceof multer.MulterError) {
    errorType = 'multer';
    const meta = { field: err.field };
    // eslint-disable-next-line no-param-reassign
    err = new APIError({ message: err.message, status: httpStatus.BAD_REQUEST, meta });
  }

  const response = { message: err.message, status: err.status };

  if (!_.isNil(err.errorCode)) {
    response.errorCode = err.errorCode;
  }

  // Handle and format joi schema validation errors
  if (err.isJoi) {
    errorType = 'validation';
    response.status = httpStatus.BAD_REQUEST;
    response.message = '';

    const errors = { validation: { source: err.source, keys: [], details: [] } };

    // Concatenate all validation errors to be reported
    if (err.details) {
      err.details.forEach(detail => {
        response.message += `${detail.message.replace(/"/g, '\'')}\n`;
        const detailPath = detail.path.join('.');
        errors.validation.keys.push(sanitize(detailPath));

        errors.validation.details.push({
          path: detail.path,
          message: `${detail.message.replace(/"/g, '\'')}`,
        });
      });
    }

    response.errors = errors;
  }

  // ========== Extract metadata for error logging ==========
  const metadata = {
    err,
    requestBody: stringifyFields(req.body),
    requestQuery: stringifyFields(req.query),
    requestParams: stringifyFields(req.params),
    originalUrl: req.originalUrl,
  };

  if (req.user != null) { metadata.user = parseRequestUser(req.user); }

  const loggerOptions = removeNullFields({
    ...LOGGER_MODULE_INFO,
    ...metadata,
    errorType,
    layer: 'error-handler',
    stack: err.stack,
    status: err.status,
  });

  // ========== Handle unknown errors ==========
  // For any unknown errors, report "something went wrong"
  if (_.isNil(response.message) || _.isNil(response.status) || response.status >= 500) {
    response.message = 'Something Went Wrong';
    Logger.fatal(`Internal server error: ${err.message}`, loggerOptions);
  }

  // ========== Send error response to user ==========
  if (!_.isEmpty(err.meta)) { response.meta = err.meta; }
  if (_.isNil(response.status)) { response.status = httpStatus.INTERNAL_SERVER_ERROR; }

  // Attach error to response for better logs
  res.error = err;

  return res.status(response.status).json(response);
};

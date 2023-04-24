import express from 'express';
import bodyParser from 'body-parser';
import httpStatus from 'http-status';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import { authenticate, errorHandler, authorize } from './common/middlewares';
import { boot } from './startup';
import router from './router';
import { config } from './common/config';

boot();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// dev logging middleware
if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Set security headers
app.use(helmet());

// prevent xss attacks
app.use(xss());

// Limit number of requests per user
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);


app.get('/', authenticate, authorize('admin', 'user'), (req, res) => {
  res.send('Hello');
});

app.use(router);

// General error handler
app.use(errorHandler);

app.use((req, res) => { res.status(httpStatus.NOT_FOUND).json({ message: `Cannot ${req.method} ${req.originalUrl}` }); });

export default app;

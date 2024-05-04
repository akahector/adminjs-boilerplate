import express from 'express';
import AdminJS from 'adminjs';
import compression from 'compression';
import cors from 'cors';
import { jwtStrategy } from './config/passport.js';
import config from './config/config.js';
import morgan, { errorHandler } from './config/morgan.js';
import { buildAuthenticatedRouter } from '@adminjs/express';
import xss from './middleware/xss.js';
import provider from './admin/auth-provider.js';
import initializeDb from './db/index.js';
import { authLimiter } from './middleware/rateLimiter.js';
import routes from './routes/v1/index.js';
import { Database, Resource } from '@adminjs/prisma'
import options from './admin/options.js';
import * as url from 'url'
import path from 'path';
import ApiError from './utils/ApiError.js';
import httpStatus from 'http-status';
import { errorConverter } from './middleware/error.js';
import passport from 'passport';



AdminJS.registerAdapter({ Database, Resource })

  const app = express();


  await initializeDb();

  const admin = new AdminJS(options);

  const router = buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: process.env.COOKIE_SECRET,
      cookieName: 'adminjs',
      provider,
    },
    null,
    {
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: true,
      resave: true,
    },
  );

  if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    admin.watch();
  }
  
  app.use(admin.options.rootPath, router);


const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, '..', 'uploads');
const assetssDir = path.join(__dirname, '..', 'assets');

app.use('/uploads', express.static(uploadsDir));
app.use('/assets', express.static(assetssDir));

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}


// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());


// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

  // parse urlencoded request body
app.use(express.urlencoded({ extended: true }));


//   parse json request body
app.use(express.json());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

  // v1 api routes
  app.use('/v1', routes);


  // send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

  export default app;
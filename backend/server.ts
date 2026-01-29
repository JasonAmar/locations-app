import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import placesRoutes from './routes/places-routes.ts';
import userRoutes from './routes/users-routes.ts';
import HttpError from './models/http-error.ts';

const app = express();

app.use(bodyParser.json());
app.use('/api/places', placesRoutes);
app.use('/api/users', userRoutes);
app.use((_req: Request, _res: Response, _next: NextFunction) => {
  throw new HttpError('Could not find this route.', 404);
});
app.use(
  (error: HttpError, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }

    res.status(error.code);
  res.json({ message: error.message || 'An unknown error occurred!' });
  },
);

mongoose
  .connect('uri')
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });

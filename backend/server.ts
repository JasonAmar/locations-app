import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import bodyParser from 'body-parser';

import placesRoutes from './routes/places-routes.ts';
import userRoutes from './routes/users-routes.ts';

const app = express();

app.use('/api/places', placesRoutes);
app.use('/api/users', userRoutes);
app.use(
  (
    error: NodeJS.ErrnoException,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (res.headersSent) {
      return next(error);
    }

    res.status(parseInt(error.code ?? '') || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
  }
);

app.listen(5000);

import { v4 as uuid } from 'uuid';
import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import HttpError from '../models/http-error.ts';

const USERS = [
  {
    id: 'u1',
    name: 'Jason',
    email: 'jason@jason.com',
    password: 'hashedpassword',
    image:
      'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    places: 1,
  },
  {
    id: 'u2',
    name: 'Max',
    email: 'max@max.com',
    password: 'hashedpassword',
    image:
      'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    places: 6,
  },
];

export const getAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.json({ users: [...USERS] });
};

export const signup = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data', 422)
    );
  }

  const { name, email, password } = req.body;
  const identifiedUser = USERS.find((user) => user.email === email);

  if (identifiedUser) {
    return next(new HttpError('User already exists', 422));
  }
  const createdUser = {
    id: uuid(),
    name,
    email,
    password,
    image: '',
    places: 0,
  };

  USERS.push(createdUser);
  let returnedUser = { ...createdUser };
  delete returnedUser.password;
  return res.status(201).json({ user: returnedUser });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const identifiedUser = USERS.find(
    (user) => user.email === email && user.password === password
  );

  if (!identifiedUser) {
    return next(
      new HttpError(
        'Could not identify user with the provided email and password.',
        401
      )
    );
  }
  return res.json({ message: 'login successful' });
};

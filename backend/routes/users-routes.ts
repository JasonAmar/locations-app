import { Router } from 'express';
import { check } from 'express-validator';
import {
  getAllUsers,
  login,
  signup,
} from '../controllers/users-controllers.ts';

const router = Router();

router.get('/', getAllUsers);

router.post(
  '/signup',
  [
    check('name').notEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  signup
);

router.post('/login', login);

export default router;

import { Router } from 'express';
import { check } from 'express-validator';

import {
  createPlace,
  deletePlace,
  getPlaceById,
  getPlacesByUserId,
  updatePlace,
} from '../controllers/places-controllers.ts';

const router = Router();

router.get('/:pid', getPlaceById);

router.get('/user/:uid', getPlacesByUserId);

router.post(
  '/',
  [
    check('title').notEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').notEmpty(),
  ],
  createPlace
);

router.patch(
  '/:pid',
  [
    check('title').notEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').notEmpty(),
  ],
  updatePlace
);

router.delete('/:pid', deletePlace);

export default router;

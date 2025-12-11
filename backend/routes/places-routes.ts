import express from 'express';

import HttpError from '../models/http-error.ts';

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped2%29.jpg/400px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped2%29.jpg',
    address: '20 W 34th St, New York, NY 10001, United States',
    coordinates: { lat: 40.7484405, lng: -73.9878584 },
    creatorId: 'u1',
  },
  {
    id: 'p2',
    title: 'Emp. State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped2%29.jpg/400px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped2%29.jpg',
    address: '20 W 34th St, New York, NY 10001, United States',
    coordinates: { lat: 40.7484405, lng: -73.9878584 },
    creatorId: 'u2',
  },
];

router.get('/:pid', (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((place) => place.id === placeId);

  if (!place) {
    return next(
      new HttpError('Could not find a place for the provided id.', 404)
    );
  }
  res.json({ place });
});

router.get('/user/:uid', (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((place) => place.creatorId === userId);
  if (!place) {
    return next(
      new HttpError('Could not find a place for the provided user id.', 404)
    );
  }
  res.json({ place });
});

export default router;

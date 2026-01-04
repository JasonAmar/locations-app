import { v4 as uuid } from 'uuid';
import { type NextFunction, type Request, type Response } from 'express';
import { validationResult } from 'express-validator';

import HttpError from '../models/http-error.ts';
import { getCoordinatesForAddress } from '../util/location.ts';
import Place from '../models/places.ts';

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

function removeNullUndefined(obj: Object) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}

export const getPlaceById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!place) {
    return next(
      new HttpError('Could not find a place for the provided id.', 404)
    );
  }
  res.json({ place: { ...place } });
};

export const getPlacesByUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => p.creatorId === userId);
  if (!places || places.length === 0) {
    return next(
      new HttpError('Could not find any places for the provided user id.', 404)
    );
  }
  res.json({ places: [...places] });
};

export const createPlace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data', 422)
    );
  }

  const { title, description, imageUrl, address, creatorId } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordinatesForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    imageUrl,
    address,
    coordinates,
    creatorId,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError(
      'Creating place failed, please try again.',
      500
    );
    return next(error);
  }
  res.status(201).json({ place: createdPlace });
};

export const updatePlace = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //TODO: Check auth header to see if user has authority to update item
  //If not, then throw unauthorized error

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data', 422)
    );
  }

  const placeId = req.params.pid;
  const oldPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!oldPlace) {
    return next(
      new HttpError('Could not find a place for the provided id.', 404)
    );
  }

  const userSubmittedPlace = (({
    title,
    description,
    imageUrl,
    coordinates,
    address,
  }) => ({ title, description, imageUrl, coordinates, address }))(req.body);

  const updatedPlace = {
    ...oldPlace,
    ...removeNullUndefined(userSubmittedPlace),
  };

  const index = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  //will update DB in the future
  //@ts-ignore
  DUMMY_PLACES[index] = updatedPlace;
  res.json({ place: updatedPlace });
};

export const deletePlace = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //TODO: Check auth header to see if user has authority to delete item
  //If not, then throw unauthorized error

  const index = DUMMY_PLACES.findIndex((p) => p.id === req.params.pid);

  if (index <= -1) {
    return next(
      new HttpError('Could not find a place for the provided id.', 404)
    );
  }

  //will delete from DB in the future
  DUMMY_PLACES.splice(index, 1);
  res.status(204).json({});
};

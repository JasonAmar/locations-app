import { type NextFunction, type Request, type Response } from 'express';
import { validationResult } from 'express-validator';

import HttpError from '../models/http-error.ts';
import { getCoordinatesForAddress } from '../util/location.ts';
import PlaceEntity from '../models/places.ts';

//TODO: validate Ids are of proper format where applicable
//otherwise they return 500 error instead of 404

function removeNullUndefined(obj: Object) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}

export const getPlaceById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await PlaceEntity.findById(placeId);
  } catch (error) {
    return next(
      new HttpError('Something went wrong, could not find a place', 500),
    );
  }

  if (!place) {
    return next(
      new HttpError('Could not find a place for the provided id.', 404),
    );
  }
  res.json({ place: place.toObject({ getters: true }) });
};

export const getPlacesByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.uid;
  if (!userId) {
    return next(new HttpError('Invalid user id provided ', 400));
  }

  let places;
  try {
    places = await PlaceEntity.find({ creatorId: userId });
  } catch (error) {
    return next(
      new HttpError('Something went wrong, could not find places', 500),
    );
  }

  if (!places || places.length === 0) {
    return next(
      new HttpError('Could not find any places for the provided user id.', 404),
    );
  }
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

export const createPlace = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data', 422),
    );
  }

  const { title, description, imageUrl, address, creatorId } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordinatesForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new PlaceEntity({
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
      500,
    );
    return next(error);
  }
  res.status(201).json({ place: createdPlace });
};

export const updatePlace = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //TODO: Check auth header to see if user has authority to update item
  //If not, then throw unauthorized error

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data', 422),
    );
  }

  const placeId = req.params.pid;
  const userSubmittedPlace = (({
    title,
    description,
    imageUrl,
    coordinates,
    address,
  }) => ({ title, description, imageUrl, coordinates, address }))(req.body);

  const updatedPlace = {
    ...removeNullUndefined(userSubmittedPlace),
  };

  let place;
  try {
    place = await PlaceEntity.findByIdAndUpdate(placeId, updatedPlace, {
      new: true,
    });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not update place.', 500),
    );
  }

  if (!place) {
    return next(
      new HttpError('Could not find a place for the provided id.', 404),
    );
  }

  res.json({ place: place?.toObject({ getters: true }) });
};

export const deletePlace = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //TODO: Check auth header to see if user has authority to delete item
  //If not, then throw unauthorized error

  const placeId = req.params.pid;
  let place;
  try {
    place = await PlaceEntity.findByIdAndDelete(placeId);
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not delete place.', 500),
    );
  }

  if (!place) {
    return next(
      new HttpError('Could not find a place for the provided id.', 404),
    );
  }

  res.status(204).json({});
};

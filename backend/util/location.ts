import HttpError from '../models/http-error.ts';

export const getCoordinatesForAddress = async (address: string) => {
  const response = await fetch(
    `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&singleLine=${address}&outFields=Match_addr,Addr_type`
  );

  if (!response.ok) {
    const error = new HttpError(
      `Could not find location for this address, status=${response.statusText}`,
      response.status
    );
    throw error;
  }

  const data: { candidates: { location: { x: number; y: number } }[] } =
    (await response.json()) as {
      candidates: { location: { x: number; y: number } }[];
    };

  // Check if no matches were found
  if (!data || !data.candidates[0]) {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }

  // Get Latitude
  const lat = data.candidates[0].location.y;
  // Get Longitude
  const lng = data.candidates[0].location.x;

  return {
    lat,
    lng,
  };
};

import { useParams } from "react-router-dom";

import PlaceList from "../../places/components/PlaceList";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped2%29.jpg/400px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped2%29.jpg",
    address: "20 W 34th St, New York, NY 10001, United States",
    coordinates: { lat: 40.7484405, lng: -73.9878584 },
    creatorId: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped2%29.jpg/400px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped2%29.jpg",
    address: "20 W 34th St, New York, NY 10001, United States",
    coordinates: { lat: 40.7484405, lng: -73.9878584 },
    creatorId: "u2",
  },
];

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter(
    (place) => place.creatorId === userId
  );
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;

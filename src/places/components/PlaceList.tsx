import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";
import { PlaceItemProps } from "../../types";

interface PlaceListProps {
  items: PlaceItemProps[];
}

const PlaceList: React.FC<PlaceListProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <button>Share Place</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {items.map((place) => (
        <PlaceItem key={place.id} {...place}>
          {place.title}
        </PlaceItem>
      ))}
    </ul>
  );
};

export default PlaceList;

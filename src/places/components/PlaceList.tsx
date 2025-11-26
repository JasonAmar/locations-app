import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";
import { PlaceItemProps } from "../../types";
import "./PlaceList.css";

interface PlaceListProps {
  items: PlaceItemProps[];
}

const PlaceList: React.FC<PlaceListProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Add Place</Button>
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

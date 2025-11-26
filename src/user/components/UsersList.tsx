import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import "./UsersList.css";

interface UsersListProps {
  items: {
    id: string;
    name: string;
    image: string;
    places: number;
  }[];
}

const UsersList: React.FC<UsersListProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <ul className="center">
        <Card className="users-list">
          <h2>No users found.</h2>
        </Card>
      </ul>
    );
  }

  return (
    <ul className="users-list">
      {items.map((user) => (
        <UserItem key={user.id} {...user} />
      ))}
    </ul>
  );
};

export default UsersList;

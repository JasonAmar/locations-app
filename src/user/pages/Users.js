import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Jason",
      image:
        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
      places: 1,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;

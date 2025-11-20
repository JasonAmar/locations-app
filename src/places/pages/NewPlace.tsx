import Input from "../../shared/components/FormElements/Input";
import "./NewPlace.css";

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        // validators={[]}
        // onChange={() => {}}
      />
    </form>
  );
};

export default NewPlace;

import { useReducer } from "react";

import "./Input.css";

interface props {
  id: string;
  element: "input" | "textarea";
  type: string;
  label: string;
  rows?: number;
  placeholder?: string;
  validators?: any[];
  errorText?: string;
  //   onChange: (id: string, value: string, isValid: boolean) => void;
}

const inputReducer = (state: any, action: any) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: true, //replace with actual validation logic
      };
    default:
      return state;
  }
};

const Input: React.FC<props> = ({
  id,
  element,
  type,
  label,
  rows = 3,
  placeholder,
  //   validators,
  errorText = "Please enter a valid title.",
  //   onChange,
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  const changeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({ type: "CHANGE", value: event.target.value });
  };

  const ele =
    element === "input" ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={id}
        rows={rows}
        onChange={changeHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && "form-control--invalid"
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {ele}
      {!inputState.isValid && <p>{errorText}</p>}
    </div>
  );
};

export default Input;

import { useReducer, useEffect } from "react";

import { validate } from "../../util/validators";
import "./Input.css";

interface InputProps {
  id: string;
  element: "input" | "textarea";
  type?: string;
  label: string;
  rows?: number;
  placeholder?: string;
  validators?: any[];
  errorText: string;
  onInput: (id: string, value: string, isValid: boolean) => void;
  initialValue?: string;
  initialValid?: boolean;
}

const inputReducer = (state: any, action: any) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };

    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input: React.FC<InputProps> = ({
  id,
  element,
  type,
  label,
  rows = 3,
  placeholder,
  validators,
  errorText,
  onInput,
  initialValue = "",
  initialValid = false,
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue,
    isTouched: false,
    isValid: initialValid,
  });

  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, onInput, value, isValid]);

  const changeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: "CHANGE",
      value: event.target.value,
      validators: validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const ele =
    element === "input" ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onBlur={touchHandler}
        onChange={changeHandler}
        value={value}
      />
    ) : (
      <textarea
        id={id}
        rows={rows}
        onBlur={touchHandler}
        onChange={changeHandler}
        value={value}
      />
    );

  return (
    <div
      className={`form-control ${
        !isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {ele}
      {!isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;

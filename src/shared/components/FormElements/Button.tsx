import { Link } from "react-router-dom";

import "./Button.css";
import { PropsWithChildren } from "react";

interface props {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size?: "small" | "default" | "big";
  href?: string;
  to?: string;
  inverse?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<PropsWithChildren<props>> = ({
  type,
  disabled,
  onClick,
  size,
  href,
  to,
  inverse,
  danger,
  children,
}) => {
  if (href) {
    return (
      <a
        className={`button button--${size || "default"} ${
          inverse && "button--inverse"
        } ${danger && "button--danger"}`}
        href={href}
      >
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link
        to={to}
        className={`button button--${size || "default"} ${
          inverse && "button--inverse"
        } ${danger && "button--danger"}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${size || "default"} ${
        inverse && "button--inverse"
      } ${danger && "button--danger"}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

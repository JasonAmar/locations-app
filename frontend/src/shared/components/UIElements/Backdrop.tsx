import ReactDOM from "react-dom";

import "./Backdrop.css";

interface BackdropProps {
  onClick: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({ onClick }) => {
  const backdropHook = document.getElementById("backdrop-hook");

  return (
    backdropHook &&
    ReactDOM.createPortal(
      <div className="backdrop" onClick={onClick}></div>,
      backdropHook
    )
  );
};

export default Backdrop;

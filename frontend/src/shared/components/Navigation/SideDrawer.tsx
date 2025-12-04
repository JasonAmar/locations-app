import { useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";

interface SideDrawerProps {
  show: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ show, onClick, children }) => {
  const nodeRef = useRef(null);
  const content = (
    <CSSTransition
      nodeRef={nodeRef}
      in={show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside ref={nodeRef} className={"side-drawer"} onClick={onClick}>
        {children}
      </aside>
    </CSSTransition>
  );

  const drawerHook = document.getElementById("drawer-hook");
  return drawerHook && ReactDOM.createPortal(content, drawerHook);
};

export default SideDrawer;

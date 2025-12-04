import React, { PropsWithChildren } from "react";
import ReactDom from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import "./Modal.css";

const ModalOverlay: React.FC<PropsWithChildren<any>> = ({
  className,
  style,
  headerClass,
  header,
  onSubmit,
  contentClass,
  footerClass,
  footer,
  nodeRef,
  children,
}) => {
  const content = (
    <div ref={nodeRef} className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}>
        <div className={`modal__content ${contentClass}`}>{children}</div>
        <footer className={`modal__footer ${footerClass}`}>{footer}</footer>
      </form>
    </div>
  );

  return ReactDom.createPortal(content, document.getElementById("modal-hook")!);
};

const Modal = ({ show, onCancel, ...rest }) => {
  const nodeRef = React.useRef(null);
  return (
    <>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition
        nodeRef={nodeRef}
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay nodeRef={nodeRef} {...rest} />
      </CSSTransition>
    </>
  );
};

export default Modal;

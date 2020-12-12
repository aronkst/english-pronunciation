import React from "react";
import BootstrapModal from "react-bootstrap/Modal";

const Modal = (props) => {
  return (
    <BootstrapModal
      show={props.show}
      onHide={() => props.handleClose()}
      animation={false}
    >
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{props.title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>{props.body}</BootstrapModal.Body>
      <BootstrapModal.Footer>{props.footer}</BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modal;

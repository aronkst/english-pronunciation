import React, { useState } from "react";
import Aux from "./../hoc/Aux";
import Modal from "./Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ModalNewText = (props) => {
  const [text, setText] = useState("");
  const [alreadyTyped, setAlreadyTyped] = useState(false);

  const handleChange = (event) => {
    setText(event.target.value);
    setAlreadyTyped(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submit();
  };

  const submit = () => {
    if (text) {
      props.setText(text);
      close();
    } else {
      setAlreadyTyped(true);
    }
  };

  const close = () => {
    setText("");
    setAlreadyTyped(false);
    props.setShow(false);
  };

  const modalBody = (
    <Form onSubmit={(event) => handleSubmit(event)}>
      <Form.Group controlId="text">
        <Form.Label>Text</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the text"
          isValid={alreadyTyped ? text.length > 0 : false}
          isInvalid={alreadyTyped ? text.length <= 0 : false}
          onChange={(event) => handleChange(event)}
        />
        <Form.Text className="text-muted">
          This will be the text you must pronounce
        </Form.Text>
      </Form.Group>
    </Form>
  );

  const modalFooter = (
    <Aux>
      <Button variant="primary" onClick={() => submit()}>
        Set
      </Button>
      <Button variant="danger" onClick={() => close()}>
        Cancel
      </Button>
    </Aux>
  );

  return (
    <Modal
      show={props.show}
      title="New text"
      body={modalBody}
      footer={modalFooter}
      handleClose={close}
    />
  );
};

export default ModalNewText;

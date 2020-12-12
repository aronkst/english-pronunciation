import React, { useState } from "react";
import Aux from "./../hoc/Aux";
import Modal from "./Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ModalTrainingMode = (props) => {
  const [texts, setTexts] = useState(0);
  const [score, setScore] = useState(0);
  const [alreadyTypedTexts, setAlreadyTypedTexts] = useState(false);
  const [alreadyTypedScore, setAlreadyTypedScore] = useState(false);

  const handleChangeTexts = (event) => {
    setTexts(event.target.value);
    setAlreadyTypedTexts(true);
  };

  const handleChangeScore = (event) => {
    setScore(event.target.value);
    setAlreadyTypedScore(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submit();
  };

  const submit = () => {
    if (texts > 0 && score > 0 && texts <= 100 && score <= 100) {
      props.trainingModeBegin(texts, score);
      close();
    } else {
      setAlreadyTypedTexts(true);
      setAlreadyTypedScore(true);
    }
  };

  const close = () => {
    setTexts(1);
    setScore(1);
    setAlreadyTypedTexts(false);
    setAlreadyTypedScore(false);
    props.setShow(false);
  };

  const modalBody = (
    <Form onSubmit={(event) => handleSubmit(event)}>
      <Form.Group controlId="text">
        <Form.Label>Amount of texts</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter the amount of texts"
          isValid={alreadyTypedTexts ? texts > 0 && texts <= 100 : false}
          isInvalid={alreadyTypedTexts ? texts <= 0 || texts > 100 : false}
          onChange={(event) => handleChangeTexts(event)}
        />
        <Form.Text className="text-muted">
          This will be the amount of texts you will pronounce
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="text">
        <Form.Label>Minimum score</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter the minimum score"
          isValid={alreadyTypedScore ? score > 0 && score <= 100 : false}
          isInvalid={alreadyTypedScore ? score <= 0 || score > 100 : false}
          onChange={(event) => handleChangeScore(event)}
        />
        <Form.Text className="text-muted">
          This will be the minimum score of your pronunciation to go to the next
          text
        </Form.Text>
      </Form.Group>
    </Form>
  );

  const modalFooter = (
    <Aux>
      <Button variant="primary" onClick={() => submit()}>
        Start
      </Button>
      <Button variant="danger" onClick={() => close()}>
        Cancel
      </Button>
    </Aux>
  );

  return (
    <Modal
      show={props.show}
      title="Training mode"
      body={modalBody}
      footer={modalFooter}
      handleClose={close}
    />
  );
};

export default ModalTrainingMode;

import React from "react";
import Aux from "./../hoc/Aux";
import Button from "react-bootstrap/Button";

const TrainingButton = (props) => {
  return (
    <Aux>
      {props.active ? (
        <Button
          variant="primary"
          className="float-right"
          onClick={() => props.stopTraining()}
        >
          Stop training mode
        </Button>
      ) : (
        <Button
          variant="primary"
          className="float-right"
          onClick={() => props.beginTraining()}
        >
          Start training mode
        </Button>
      )}
    </Aux>
  );
};

export default TrainingButton;

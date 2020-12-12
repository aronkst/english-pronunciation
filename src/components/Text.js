import React from "react";
import Aux from "./Aux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

const Text = (props) => {
  return (
    <Card>
      <Card.Header>Text to pronounce</Card.Header>
      <Card.Body>
        <Card.Text>
          {props.text ? (
            props.text.split(" ").map((word, index) => (
              <Aux key={index}>
                <span onClick={() => props.listen(word)}>{word}</span>
                <span> </span>
              </Aux>
            ))
          ) : (
            <span className="white">.</span>
          )}
        </Card.Text>
        <Button
          variant="success"
          onClick={() => props.setNewText()}
          disabled={props.isTrainingMode}
        >
          Insert a new text
        </Button>
        <Button
          variant="dark"
          onClick={() => props.setGenerateText()}
          disabled={props.isTrainingMode}
        >
          Generate a new random text
        </Button>
        <Button
          variant="info"
          onClick={() => props.listen(props.text)}
          disabled={props.isListening}
        >
          {props.isListening ? (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : null}
          {" Listen the text"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Text;

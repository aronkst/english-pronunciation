import React from "react";
import Aux from "./Aux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Spinner from "react-bootstrap/Spinner";

const Record = (props) => {
  return (
    <Aux>
      <Card
        style={{
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0",
          borderBottom: "0",
        }}
      >
        <Card.Header>Recorded text and your score</Card.Header>
        <Card.Body>
          <Card.Text>
            {props.talked ? props.talked : <span className="white">.</span>}
            <br />
            <Aux>
              {props.letters.length > 0 ? (
                props.letters.map((letter, index) => (
                  <span key={index} className={letter.color}>
                    {letter.value}
                  </span>
                ))
              ) : (
                <span className="white">.</span>
              )}
            </Aux>
          </Card.Text>
          <Button
            variant="danger"
            onClick={() => props.recording()}
            disabled={props.isRecording}
          >
            {props.isRecording ? (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : null}
            {" Record the text"}
          </Button>
        </Card.Body>
      </Card>
      <ProgressBar
        style={{
          borderTopLeftRadius: "0",
          borderTopRightRadius: "0",
        }}
        striped
        variant="danger"
        now={props.similarity}
        label={`${props.similarity}%`}
      />
    </Aux>
  );
};

export default Record;

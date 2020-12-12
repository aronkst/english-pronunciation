import React, { useEffect, useState } from "react";
import Aux from "./../hoc/Aux";
import BootstrapAlert from "react-bootstrap/Alert";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Alert = (props) => {
  const [progressBar, setProgressBar] = useState(0);

  useEffect(() => {
    let value = (props.points * 100) / props.texts;
    value = Math.ceil(value);
    if (value > 100) {
      value = 100;
    }
    if (value < 0) {
      value = 0;
    }
    setProgressBar(value || 0);
  }, [props.texts, props.points]);

  return (
    <Aux>
      {props.active ? (
        <Row>
          <Col>
            <BootstrapAlert
              style={{
                borderBottomLeftRadius: "0",
                borderBottomRightRadius: "0",
                borderBottom: "0",
                marginBottom: "0",
              }}
              variant={props.variant}
            >
              {props.message}
            </BootstrapAlert>
            <ProgressBar
              striped
              style={{
                borderTopLeftRadius: "0",
                borderTopRightRadius: "0",
              }}
              now={progressBar}
              label={`${progressBar}%`}
            />
          </Col>
        </Row>
      ) : null}
    </Aux>
  );
};

export default Alert;

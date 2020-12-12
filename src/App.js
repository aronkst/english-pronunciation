import React, { useState } from "react";
import Aux from "./hoc/Aux";
import Text from "./components/Text";
import Record from "./components/Record";
import Alert from "./components/Alert";
import ModalNewText from "./components/ModalNewText";
import ModalTrainingMode from "./components/ModalTrainingMode";
import TrainingButton from "./components/TrainingButton";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as txtgen from "txtgen";
import * as stringSimilarity from "string-similarity";
import * as Diff from "diff";

function App() {
  const generateText = () => {
    let text = "";
    while (
      text === "" ||
      text.includes(",") ||
      text.includes("'") ||
      text.includes("-") ||
      text.length > 50
    ) {
      text = txtgen.sentence().toLowerCase().slice(0, -1);
    }
    return text;
  };

  const [text, setText] = useState(generateText());
  const [modalNewText, setModalNewText] = useState(false);
  const [modalTrainingMode, setModalTrainingMode] = useState(false);
  const [talked, setTalked] = useState("");
  const [similarity, setSimilarity] = useState(0);
  const [letters, setLetters] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [trainingMode, setTrainingMode] = useState({
    active: false,
    variant: "primary",
    message: "",
    text: "",
    texts: 0,
    score: 0,
    attempts: 0,
    points: 0,
  });

  const resetValues = () => {
    setText(generateText());
    setTalked("");
    setSimilarity(0);
    setLetters([]);
  };

  const resetRecordValues = () => {
    setTalked("");
    setSimilarity(0);
    setLetters([]);
  };

  const recording = (trainingText = null) => {
    setIsRecording(true);
    resetRecordValues();

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onaudioend = () => {
      setIsRecording(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setTalked(transcript);

      const checkText = trainingText || text;

      const value = Math.ceil(
        stringSimilarity.compareTwoStrings(checkText, transcript) * 100
      );
      setSimilarity(value);

      const lettersDiff = [];
      Diff.diffChars(checkText, transcript).forEach((part) => {
        const color = part.added ? "green" : part.removed ? "red" : "black";
        lettersDiff.push({ value: part.value, color: color });
      });
      setLetters(lettersDiff);

      trainingModeCheck(value);
    };
  };

  const setNewText = () => {
    setModalNewText(true);
  };

  const setGenerateText = (text = null) => {
    resetValues();
    setText(text || generateText());
  };

  const listen = (value) => {
    setIsListening(true);

    const speech = new SpeechSynthesisUtterance();
    speech.text = value;
    speech.lang = "en-US";

    window.speechSynthesis.speak(speech);

    speech.onend = () => {
      setIsListening(false);
    };
  };

  const trainingModeInit = () => {
    setModalTrainingMode(true);
  };

  const trainingModeBegin = (texts, score) => {
    setTrainingMode({
      active: true,
      variant: "primary",
      message: "Starting the training mode",
      text: "",
      texts: texts,
      score: score,
      attempts: 0,
      points: 0,
    });

    setTimeout(() => {
      trainingModeNewText();
    }, 2000);
  };

  const trainingModeStop = () => {
    setTrainingMode((trainingData) => {
      return { ...trainingData, active: false };
    });
  };

  const trainingModeNewText = () => {
    setTrainingMode((trainingData) => {
      if (trainingData.active) {
        const trainingText = generateText();
        setGenerateText(trainingText);

        return {
          ...trainingData,
          text: trainingText,
          message: "New generated text",
        };
      }

      return trainingData;
    });

    setTimeout(() => {
      trainingModePrepareRecording();
    }, 2000);
  };

  const trainingModePrepareRecording = () => {
    setTrainingMode((trainingData) => {
      if (trainingData.active) {
        return {
          ...trainingData,
          message: "Get ready, the recording will start soon",
        };
      }

      return trainingData;
    });

    setTimeout(() => {
      trainingModeRecording();
    }, 2000);
  };

  const trainingModeRecording = () => {
    setTrainingMode((trainingData) => {
      if (trainingData.active) {
        recording(trainingData.text);

        return {
          ...trainingData,
          message: "Recording, speak",
        };
      }

      return trainingData;
    });
  };

  const trainingModeCheck = (similarity) => {
    let next = null;

    setTrainingMode((trainingData) => {
      if (trainingData.active) {
        if (similarity >= trainingData.score) {
          const points = trainingData.points + 1;

          if (points >= trainingData.texts) {
            next = trainingModeFinish;
          } else {
            next = trainingModeNewText;
          }

          return {
            ...trainingData,
            message: "Congratulations",
            points: points,
          };
        } else {
          const attempts = trainingData.attempts + 1;

          if (attempts >= 3) {
            next = trainingModeNewText;

            return {
              ...trainingData,
              message: "A new text will be generated",
              attempts: 0,
            };
          } else {
            next = trainingModeRecording;

            return {
              ...trainingData,
              message: "Try again",
              attempts: attempts,
            };
          }
        }
      }

      return trainingData;
    });

    if (next) {
      setTimeout(() => {
        next();
      }, 2000);
    }
  };

  const trainingModeFinish = () => {
    setTrainingMode((trainingData) => {
      if (trainingData.active) {
        return {
          ...trainingData,
          message: "Training mode is being finalized",
        };
      }

      return trainingData;
    });

    setTimeout(() => {
      trainingModeStop();
      setGenerateText();
    }, 2000);
  };

  return (
    <Aux>
      <Container>
        <Row>
          <Col>
            <TrainingButton
              active={trainingMode.active}
              beginTraining={trainingModeInit}
              stopTraining={trainingModeStop}
            />
            <Header />
          </Col>
        </Row>
        <Alert
          points={trainingMode.points}
          texts={trainingMode.texts}
          active={trainingMode.active}
          variant={trainingMode.variant}
          message={trainingMode.message}
        />
        <Row>
          <Col>
            <Text
              text={text}
              listen={listen}
              setNewText={setNewText}
              setGenerateText={setGenerateText}
              isListening={isListening}
              isTrainingMode={trainingMode.active}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Record
              talked={talked}
              letters={letters}
              recording={recording}
              similarity={similarity}
              isRecording={isRecording}
            />
          </Col>
        </Row>
      </Container>
      <ModalNewText
        setText={setText}
        show={modalNewText}
        setShow={setModalNewText}
      />
      <ModalTrainingMode
        trainingModeBegin={trainingModeBegin}
        show={modalTrainingMode}
        setShow={setModalTrainingMode}
      />
    </Aux>
  );
}

export default App;

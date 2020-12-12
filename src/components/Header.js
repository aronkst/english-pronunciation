import React from "react";
import Aux from "./Aux";

const Header = () => {
  return (
    <Aux>
      <h1>Practice Pronunciation in English</h1>
      <p>
        This application is intended for practicing pronunciation in English.
        Use Google Chrome to make all features work correctly.
      </p>
      <p>
        The text in the first frame must be recorded using the record button in
        the second frame, and it will be calculated how correct your
        pronunciation was, in the progress bar, below the frame.
      </p>
      <p>
        The Training Mode works the same way, just automating the generation of
        texts and the recording of the pronunciation.
      </p>
      <p>
        The source code is available on{" "}
        <a
          href="https://github.com/aronkst/english-pronunciation"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        .
      </p>
    </Aux>
  );
};

export default Header;

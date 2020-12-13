# English Pronunciation

This is a project of a web application to practice pronunciation of phrases and words in English. It was developed using the JavaScript programming language with the [React](https://github.com/facebook/react) library.

Browser APIs are used for [Speech To Text](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) and [Text To Speech](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance) functionality. Whatever is spoken, will be converted to text, and will be compared with the text that must be pronounced. There is also the functionality to hear what should be pronounced, to know exactly how the pronunciation is.

There is the training mode functionality, which works by automating all the actions that the user must do. When activating this feature, it must be informed how many sentences will be pronounced and the minimum punctuation to proceed to the next sentence. After entering the initial settings, a sentence will be generated that must be pronounced, and then the user will be asked to pronounce it in the microphone, after that it will be calculated how close to the user's pronunciation it was similar to the text that should be pronounced, if is greater than or equal to the minimum score entered during configuration, it goes to the next sentence, which will be generated automatically, otherwise it will be necessary to pronounce the same sentence again. This is only a summary of the training mode has been described and there are other features in between to make this mode dynamic and highly usable.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the web app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the web app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

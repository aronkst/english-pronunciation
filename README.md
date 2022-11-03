# English Pronunciation

This is a project of a web application to practice pronunciation of sentences in English. It was developed using the JavaScript programming language with the [SvelteKit](https://kit.svelte.dev/).

Browser APIs are used for [Speech To Text](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) and [Text To Speech](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance) functionality. Whatever is spoken, will be converted to text, and will be compared with the text that must be pronounced. There is also the functionality to hear what should be pronounced, to know exactly how the pronunciation is.

# Makefile

There are some commands inside the Makefile to facilitate the development and execution of this project.

Run the application:

```
make run
```

Start the Docker Compose:

```
make start
```

Stop the Docker Compose:

```
make stop
```

View logs for Docker containers:

```
make logs
```

<script>
	import sentences from '../sentences';
	import stringSimilarity from 'string-similarity';
	import { onMount } from 'svelte';

	let recognition = undefined;
	let speech = undefined;

	let sentence = '';
	let talked = '';
	let similarity = -1;

	let disableButtons = false;
	let showStopSpeak = false;
	let loading = true;

	function randomNumber() {
		return Math.floor(Math.random() * sentences.length);
	}

	function randomSentence() {
		let number = randomNumber();

		while (sentence == sentences[number]) {
			number = randomNumber();
		}

		sentence = sentences[number];
		talked = '';
		similarity = -1;
	}

	function listenSentence() {
		disableButtons = true;

		speech.text = sentence;
		window.speechSynthesis.speak(speech);
	}

	function speakWord() {
		disableButtons = true;
		showStopSpeak = true;

		talked = '';
		similarity = -1;

		recognition.start();
	}

	function stopSpeakWord() {
		disableButtons = false;
		showStopSpeak = false;

		recognition.stop();
	}

	function checkSpeak() {
		similarity = Math.ceil(
			stringSimilarity.compareTwoStrings(sentence.toUpperCase(), talked.toUpperCase()) * 100
		);
	}

	onMount(async () => {
		speech = new SpeechSynthesisUtterance();
		speech.lang = 'en-US';

		speech.onend = () => {
			disableButtons = false;
		};

		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		recognition = new SpeechRecognition();
		recognition.lang = 'en-US';
		recognition.continuous = true;

		recognition.onresult = (event) => {
			talked = event.results[0][0].transcript.toLowerCase();
			checkSpeak();
		};

		document.addEventListener(
			'keyup',
			(event) => {
				let name = event.key;
				if (name === '1') {
					if (disableButtons === false) {
						randomSentence();
					}
				}
				if (name === '2') {
					if (disableButtons === false) {
						listenSentence();
					}
				}
				if (name === '3') {
					if (showStopSpeak) {
						stopSpeakWord();
					} else {
						speakWord();
					}
				}
			},
			false
		);

		randomSentence();
		loading = false;
	});
</script>

{#if loading}
	<h2>Loading ...</h2>
{:else}
	<div>
		<button on:click={randomSentence} disabled={disableButtons}> [1] New Sentence </button>
		<button on:click={listenSentence} disabled={disableButtons}> [2] Listen </button>
		{#if showStopSpeak}
			<button on:click={stopSpeakWord}> [3] Stop </button>
		{:else}
			<button on:click={speakWord} disabled={disableButtons}> [3] Speak </button>
		{/if}
	</div>

	<h2>{sentence}</h2>

	{#if talked !== ''}
		<h2>{talked}</h2>
	{/if}

	{#if similarity >= 0}
		<code>{similarity}</code>
	{/if}
{/if}

<style>
	code {
		display: inline-block;
		margin-top: 12px;
	}
</style>

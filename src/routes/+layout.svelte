<script>
	import '../water.css';
</script>

<svelte:head>
	<title>English Pronunciation</title>
	<meta name="description" content="Practice english with this simple web app" />
</svelte:head>

<div class="app">
	<header>
		<h1>English Pronunciation</h1>
		<p>
			Developed by Aron, <a
				href="https://github.com/aronkst/english-pronunciation"
				target="_blank"
				rel="noreferrer">GitHub</a
			>
		</p>
	</header>

	<main>
		<slot />
	</main>
</div>

<style>
	header {
		margin-bottom: 2rem;
		border-bottom: 1px solid var(--border);
	}

	p {
		margin-bottom: 2rem;
	}
</style>

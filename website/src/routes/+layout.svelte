<script lang="ts">
	import '../app.css';
    import "../main"

	let { children } = $props();
</script>

<div>
    <header>
        <a data-sveltekit-preload-code href="/">Home</a>
        <a data-sveltekit-preload-code href="/editor">Editor</a>
        <a data-sveltekit-preload-code href="/about">About</a>
    </header>
    <div>
        {@render children()}
    </div>
</div>

<style>
    header {
        padding-bottom: 5rem;
    }
</style>

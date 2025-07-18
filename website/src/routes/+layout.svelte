<script lang="ts">
	import '../app.css';
	
	let { children } = $props();
</script>

<div>
    <div>
        <a href="/">Home</a>
        <a href="/editor">Editor</a>
        <a href="/about">About</a>
    </div>
    <div>
        {@render children()}
    </div>
</div>

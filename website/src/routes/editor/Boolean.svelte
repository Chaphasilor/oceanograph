<script lang="ts">
    import Base from "./Base.svelte";

    export let value: boolean;
    export let title: string;
    export let description: string;
</script>


<Base {title} {description} error={undefined}>
    <input type="checkbox" bind:checked={value} />
</Base>

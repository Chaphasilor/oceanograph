<script lang="ts">
    import type { Release } from "shared/parser/types";
    import Base from "./Base.svelte";
    import CDate from "./CDate.svelte";

    export let value: Release[];
</script>


<Base title="Releases" description="A List of all or recent Releases" error={undefined}>
    {#each value as release, index}
        <div>
            Version: <input bind:value={release.version} />
            Date: <CDate title="" description="" bind:value={release.at} />
            <button on:click={() => {
                value = value.filter((_, i) => i != index)
            }}>remove</button>
        </div>
    {/each}

    <button on:click={() => {
        value.push({
            at: new Date(),
            version: ""
        })
        value = value
    }}>add</button>
</Base>


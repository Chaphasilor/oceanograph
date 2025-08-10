<script lang="ts">
    import { Platform, type Version } from "shared/parser/types";
    import Base from "./Base.svelte";

    export let values: { [key in Platform]?: Version | true };

    let selected: Platform = Object.keys(Platform)[0] as Platform;

    function rm(key: Platform) {
        delete values[key];
        values = values; // send update
    }
</script>

<Base title="Platforms" description="The Platforms your app currently supports. (Version is optional)" error={undefined} >
    {#each Object.entries(values) as [key, value]}
        <div class="entry">
            <div>
                {key}
                Version: <input on:change={(e)=>{
                    let value:string|boolean = e.currentTarget.value
                    if (value == "") value = true;
                    values[key as Platform] = value
                    values = values; // send update
                }} value={typeof value == "boolean" ? "" : value} />
            </div>
            <button on:click={()=>rm(key as Platform)}>remove</button>
        </div>
    {/each}

    <select bind:value={selected}>
        {#each Object.values(Platform) as plt}
            {#if !Object.keys(values).includes(plt)}
                <option>{plt}</option>
            {/if}
        {/each}
    </select>
    <button on:click={() => {
        values[selected] = true;
        values = values // send update
    }}>add</button>
</Base>

<style>
    .entry {
        justify-content: space-between;
        width: 100%;
    }
</style>

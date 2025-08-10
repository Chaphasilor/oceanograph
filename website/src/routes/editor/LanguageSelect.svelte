<script lang="ts">
    import { Language, type Version } from "shared/parser/types";
    import Base from "./Base.svelte";

    export let value: Language[];

    let selected: Language = Object.keys(Language)[0] as Language;

    function rm(index: number) {
        delete value[index];
        value = value; // send update
    }
</script>

<Base title="Languages" description="Languages Used to Build your app" error={undefined} >
    {#each value as lang, index}
        <div class="entry">
            <div>{lang}</div>
            <button on:click={()=>rm(index)}>remove</button>
        </div>
    {/each}

    <select bind:value={selected}>
        {#each Object.values(Language) as plt}
            {#if !value.includes(plt as Language)}
                <option>{plt}</option>
            {/if}
        {/each}
    </select>
    <button on:click={() => {
        if (selected == "" as Language) return;
        value.push(selected)
        value = value // send update
        selected = "" as Language
    }}>add</button>
</Base>

<style>
    .entry {
        justify-content: space-between;
        width: 100%;
    }
</style>

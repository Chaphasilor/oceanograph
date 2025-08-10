<script lang="ts">
    import type { Capability } from "shared/parser/types";
    import Base from "./Base.svelte";

    export let _enum: object;
    export let value: any;
    export let title: string;
    export let description: string;
    let selected: string
</script>

<Base {title} {description} error={undefined}>
    {#each Object.entries(value) as [key, v]}
        <Base optional title={key} description="" error={undefined}>
            comment: <input bind:value={value[key].comment}>
            <br>
            since Version: <input bind:value={value[key].since}>
            <br>
            <button on:click={()=>{
                delete value[key]
                value = value // update UI
            }}>remove</button>
        </Base>
    {/each}
    <select bind:value={selected}>
        {#each Object.values(_enum) as en}
            {#if !Object.keys(value).includes(en)}
                <option>{en}</option>
            {/if}
        {/each}
    </select>
    <button on:click={() => {
        value[selected] = {}
    }}>add</button>

</Base>

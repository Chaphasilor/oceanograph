<script lang="ts">
    import { URLType, type cURL } from "shared/parser/types";
    import Base from "./Base.svelte";

    export let value: cURL;
    export let title: string;
    export let description: string;
    
    let error: string|undefined = undefined

    let internalValue = value.url.toString()
    let internalType = value.type

    function validator() {
        try {
            value = {
                url: new URL(internalValue),
                type: internalType
            }
            error = undefined
        } catch {
            error = "Invalid URL"
        }
    }
</script>

<Base {title} {description} {error}>
    <input type="url" bind:value={internalValue} on:change={validator}/>
    <select bind:value={internalType} on:change={validator}>
        {#each Object.values(URLType) as t}
            <option>{t}</option>
        {/each}
    </select>
</Base>

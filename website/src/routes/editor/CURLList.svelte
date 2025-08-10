<script lang="ts">
    import { URLType, type cURL } from "shared/parser/types";
    import Curl from "./CURL.svelte";
    import Base from "./Base.svelte";

    export let title: string
    export let description: string
    export let value:cURL[]
    let update = 0
</script>


{#key update}
    <Base {title} {description} error={undefined}>
        {#each value as u, i}
            <div>
                <Curl title="" description="" bind:value={u} />
                <button on:click={()=>{
                    value.splice(i, 1)
                    update++
                }}>remove</button>
            </div>
        {/each}
        <button on:click={()=>{
            value.push({
                type: URLType.generic,
                url: new URL("https://example.com")
            })
            update++
        }}>add</button>
    </Base>
{/key}

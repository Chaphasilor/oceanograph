<script lang="ts">
    import { type Author } from "shared/parser/types";
    import Base from "./Base.svelte";
    import CurlList from "./CURLList.svelte";

    export let value: Author[];
    let updated = 0;
</script>


{#key updated}
    <Base title="Authors" description="A list of the primary maintainers, owners, or persons to contact" error={undefined}>
        {#each value as auth, index}
            <Base title="" description="" error={undefined}>
                Name: <input bind:value={auth.name} />
                <CurlList title="" description="" bind:value={auth.urls}/>
                <button on:click={()=>{
                    value.splice(index, 1)
                    updated++
                }}>delete {auth.name}</button>
            </Base>
        {/each}
        <button on:click={() => {
            value.push({
                name: "unknown",
                urls: []
            })
            value = value
        }}>add author</button>
    </Base>

{/key}

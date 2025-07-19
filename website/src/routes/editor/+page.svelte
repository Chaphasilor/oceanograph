<script lang="ts">
    import { convertFromJSON, convertToJSON, deserializeStack, manifestToNormalizedForm } from '$lib/manifest/frontendFriendly.js';


    export let data;
    const manifests = deserializeStack(data.manifests)


    let selected = ""
    $: fileContent = data.manifests[selected]
    $: parsedContent = convertFromJSON(fileContent)
    $: reFiledContent = parsedContent ? convertToJSON(parsedContent) : "Error"
    $: internalStructure = parsedContent ? manifestToNormalizedForm(parsedContent) : "Error"
</script>



<select bind:value={selected}>
    {#each Object.keys(data.manifests) as key}
        <option>{key}</option>
    {/each}
</select>

<div class="wrapper">
    <textarea bind:value={fileContent}  />
    
    <div class="sticker">
        <div>
            <h1>Parsed</h1>
            <pre>{JSON.stringify(parsedContent, (_, value) => value, 4)}</pre>
        </div>
        <div>
            <h1>Re-File-ificated</h1>
            <pre>{reFiledContent}</pre>
        </div>
        <div>
            <h1>Internal JSON</h1>
            <pre>{JSON.stringify(internalStructure, (_, value) => value, 4)}</pre>
        </div>
    </div>

</div>


<style lang="scss">
    .wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        max-height: 80vh;
        .sticker {
            overflow-y: scroll;
            h1 {
                font-size: 3rem;
            }
        }
    }
</style>

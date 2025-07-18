


<script lang="ts">
    import { temporary_example_finampManifest, convertToJSON, convertFromJSON, convertManifestIntoNormalizedForm } from "$lib/manifest";


    let fileContent = JSON.stringify(temporary_example_finampManifest, (_, value) => value, 4)
    $: parsedContent = convertFromJSON(fileContent)
    $: reFiledContent = parsedContent ? convertToJSON(parsedContent) : "Error"
    $: internalStructure = parsedContent ? convertManifestIntoNormalizedForm(parsedContent) : "Error"
</script>


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

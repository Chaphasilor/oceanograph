<script lang="ts">
    import { parseIndex } from 'shared/parser/loaderBrowser.js';
    import { parseJSON } from 'shared/parser/parser.js';
    import type { Manifest } from 'shared/parser/types.js';
    // import { parseJSON, unparseManifest } from 'shared/parser/parser.js';


    export let data;
    const manifests = parseIndex(data.manifests)

    let select = Object.keys(manifests)[0]
    let parsed: Manifest;
    let errormsg = ""
    $: rawManifest = JSON.stringify(manifests[select], (k, v) => v, 4)
    $: try{   parsed = parseJSON(JSON.parse(rawManifest)); errormsg = ""  } catch (e:any) { errormsg = e.message }
    $: console.log(parsed)
    try {
    } catch {}
</script>



<select bind:value={select}>
    {#each Object.keys(manifests) as key}
        <option>{key}</option>
    {/each}
</select>


    <div>
        <h1>Raw</h1>
        <i>Parsed object is being printed into console</i><br><br>
        <p>{errormsg}</p>
        <textarea bind:value={rawManifest} cols="60" rows="60"></textarea>
    </div>


<style>
    h1 {
        font-size: 2rem;
    }
    textarea {
        resize: both;
    }
</style>

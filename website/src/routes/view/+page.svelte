<script lang="ts">
    import { convertToJSON, deserializeStack } from 'shared/parser/index';

    export let data;
    const manifests = deserializeStack(data.manifests)
    
    let selected = ""
    $: fileContent = manifests[selected]
    $: console.log(fileContent)
</script>



<select bind:value={selected}>
    {#each Object.keys(manifests) as key}
        <option>{key}</option>
    {/each}
</select>


<pre>{convertToJSON(fileContent)}</pre>

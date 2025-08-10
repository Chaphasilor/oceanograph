<script lang="ts">
    import { TandemManifestKinds, type TandemManifest } from "shared/parser/types";
    import Base from "./Base.svelte";

    export let value: TandemManifest|undefined;
</script>

<Base optional title="Tandem Manifest" description="If your app has a beta, you can link it here in order to have more info on the compatibility chart" error={undefined}>
   {#if value == undefined}
        <button on:click={() => {
            value = {
                kind: TandemManifestKinds.beta,
                manifest: "betaManifestName"
            }
        }}>add Tandem</button>
    {:else}
        Tandem Manifest Name: <input bind:value={value.manifest} /><br>
        Type: <select bind:value={value.kind}>
            {#each Object.keys(TandemManifestKinds) as name}
                <option>{name}</option>
            {/each}
        </select>
   {/if}
   
   
</Base>

<script lang="ts">
    import { page } from "$app/state";
    import { getSortedReleases } from "shared/utility/manifest";
    import { manifests } from "../../../main";
    
    import Author from "./Author.svelte";
    import { Capabilities, Features } from "shared/parser/types";
    // access the value in [slug]
    const manifestKey =  page.params.manifestKey
    const manifest = manifests[manifestKey]
    console.log(manifest)
</script>



<div class="grd">
    <div>
        <h1>
            {manifest.name}{manifest.official ? " (official)" : ""}
            <a href={manifest.url.toString()}>*link*</a>
            {#if manifest.tandemManifest}
                <a href="/view/{manifest.tandemManifest.manifest}" data-sveltekit-reload>*{manifest.tandemManifest.kind}*</a>
            {/if}
        </h1>
        <br>
        <p>{manifest.description}</p>
        <br>
        <h2>Cost_______________</h2>
        <p>
            {#if !manifest.cost}
                Free 
            {:else}
                {manifest.cost}
            {/if}
        </p>
        <br>
        <h2>Download(s)_____</h2>
        <ul>
            {#each manifest.downloads as download}
                <li>
                    <a href="{download.url.toString()}">{download.type}</a>
                </li>
            {/each}
        </ul>
        <br>
        <h2>Author(s)__________</h2>
        <div>
            {#each manifest.authors as author}
                <Author {author} />
            {/each}
        </div>
        <br>
        <h2>Latest 5 Versions______</h2>
        <ul>
            {#each getSortedReleases(manifest).slice(0, 5) as release}
                <li>
                    {release.version}
                    @ {release.at.toLocaleDateString()}
                </li>
            {/each}
        </ul>
        <br>
        <h2>Platforms________</h2>
        <ul>
            {#each Object.entries(manifest.platforms) as [platform, detail]}
                <li>
                    {platform}
                    {#if typeof detail == "string"} 
                        since {detail}
                    {/if}
                </li>
            {/each}
        </ul>
        <br>
        <h2>Community_________</h2>
        <ul>
            {#each manifest.community as community}
                <li>
                    <a href="{community.url.toString()}">{community.type}</a>
                </li>
            {/each}
        </ul>
        <br>
        <h2>Server________</h2>
        <div>
            <p>Minimum: {manifest.minServer}</p>
            <p>Maximum: {manifest.maxServer}</p>
        </div>
        <br><br><br><br>
        <p>last update @ {manifest.updatedAt.toLocaleDateString()}</p>
    </div>
    <div>
        {#each Object.values(Capabilities) as key}
            <div>
                {#if Object.keys(manifest.capabilities).includes(key)}
                    <h3>{key} [Supported]</h3>
                    {#if typeof manifest.capabilities[key] == "string"}
                        (since {manifest.capabilities[key]})
                        {:else if typeof manifest.capabilities[key] == "object"}
                        {#if manifest.capabilities[key].since}
                            (since {manifest.capabilities[key].since})
                        {/if}
                        <abbr title={manifest.capabilities[key].comment}>note</abbr>
                    {/if}
                {:else}
                    <h3>{key} [Missing]</h3>
                
                {/if}
            </div>
        {/each}
    </div>
    <div>
        {#each Object.values(Features) as key}
            <div>
                {#if Object.keys(manifest.features).includes(key)}
                    <h3>{key} [Supported]</h3>
                    {#if typeof manifest.features[key] == "string"}
                        (since {manifest.features[key]})
                        {:else if typeof manifest.features[key] == "object"}
                        {#if manifest.features[key].since}
                            (since {manifest.features[key].since})
                        {/if}
                        <abbr title={manifest.features[key].comment}>note</abbr>
                    {/if}
                {:else}
                    <h3>{key} [Missing]</h3>
                {/if}
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .grd {
        display: grid;
        grid-template-columns: 250px 1fr 1fr;
    }
</style>



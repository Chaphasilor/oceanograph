<script lang="ts">
    import { Capabilities, Features, URLType, type Manifest } from "shared/parser/types";
    import Text from "./Text.svelte";
    import CURL from "./CURL.svelte";
    import PlatformSelect from "./PlatformSelect.svelte";
    import Releases from "./Releases.svelte";
    import Boolean from "./Boolean.svelte";
    import LanguageSelect from "./LanguageSelect.svelte";
    import Authors from "./Authors.svelte";
    import CurlList from "./CURLList.svelte";
    import Tandem from "./Tandem.svelte";
    import EnumSelector from "./EnumSelector.svelte";
    import { parseManifest } from "shared/parser/parser";
    import Base from "./Base.svelte";


    const placeholder: Manifest = {
        updatedAt: new Date(),
        name: "My App",
        official: false,
        description: "A Jellyfin Client",
        url: {
            type: URLType.generic,
            url: new URL("https://example.com")
        },
        downloads: [],
        authors: [],
        community: [],
        releases: [],
        platforms: {},
        license: "MIT 2.0",
        openSource: true,
        languages: [],
        cost: "Free",
        capabilities: {},
        features: {}
    }

    let manifest: Manifest = $state(placeholder)

    function getErr(inp: object) {
        try {parseManifest(inp)}
        catch (e) {return (e as Error).message}
    }
    
    let importError: string | undefined = $state(undefined)
    let exportError = $derived(getErr(manifest))
    let stringified = $derived(!exportError ? JSON.stringify(manifest, (_, v) => v, 2) : undefined)
    
    function load(e: Event & {currentTarget: EventTarget & HTMLTextAreaElement}) {
        const value = e.currentTarget.value
        if (value == "") {
            manifest = placeholder
            importError = undefined
        }
        else {
            try {
                const json = JSON.parse(value)
                manifest = parseManifest(json)
                importError = undefined
            } catch (e) {
                importError = (e as Error).message
            }
        }
    }
</script>

<Base optional title="Load" description="Load your existing manifest into the editor" error={importError}> 
    <!-- svelte-ignore element_invalid_self_closing_tag -->
    <!-- svelte-ignore event_directive_deprecated -->
    <textarea on:change={load} />
</Base>
<div>
    <h2>Metadata</h2>
    <Text title="Name" description="The Name of the project" bind:value={manifest.name} />
    <Text title="Description" description="The Description of the project" bind:value={manifest.description} />
    <CURL title="Repository/Website" description="A link to the project" bind:value={manifest.url} />
    <Boolean title="Official" description="If your app is a Official Jellyfin-Project App" bind:value={manifest.official} />
    <Text optional title="Cost/Price" description="The price of your app. Can be monthly, one time, euro, dollar, etc."  bind:value={manifest.cost} />
    <Releases bind:value={manifest.releases} />
    <Tandem bind:value={manifest.tandemManifest} />
    <div>
        <h2>Server</h2>
        <Text optional title="Min" description="The minimum supported jellyfin server version" bind:value={manifest.minServer} />
        <Text optional title="Max" description="The maximum supported jellyfin server version" bind:value={manifest.maxServer} />
    </div>
</div>
<div>
    <h2>Code</h2>
    <Text title="License" description="The License of your code" bind:value={manifest.license} />
    <Boolean title="Open Source" description="If your app is open source or not" bind:value={manifest.openSource} />
    <LanguageSelect bind:value={manifest.languages} />
    <PlatformSelect bind:values={manifest.platforms} />
</div>
<div>
    <h2>People</h2>
    <Authors bind:value={manifest.authors} />
    <CurlList title="Community" description="Places where your community can connect" bind:value={manifest.community} />
    <CurlList title="Downloads" description="Places where your app can be downloaded" bind:value={manifest.downloads} />
</div>
<div>
    <h2>Capabilities</h2>
    <EnumSelector title="" description="" _enum={Capabilities} bind:value={manifest.capabilities} />
</div>
<div>
    <h2>Features</h2>
    <EnumSelector title="" description="" _enum={Features} bind:value={manifest.features} />
</div>

<br><br>
    <Base optional
          title="JSON file"
          description="The JSON file content for your manifest :)"
          error={exportError}>
        {#if !exportError}
            <pre>{stringified}</pre>
        {/if}
    </Base>

<style>
    .err {
        color: red
    }
    div {
        padding: 10px;
        border-radius: 10px;
        margin: 5px;
        background-color: rgba(0, 0, 0, 0.09);
    }
</style>

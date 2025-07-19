import { convertFromJSON, convertToJSON } from "./frontendFriendly"
import type { ManifestIndex } from "./types/types"

function loadManifest(path: string) {
    const content = Deno.readTextFileSync(path)
    const manifest = convertFromJSON(content)
    if (!manifest) {
        console.log("INVALID MANIFEST");
        return
    }
    return manifest
}

function loadManifests(): ManifestIndex {
    const folder = "../manifests"
    const files = Deno.readDirSync(folder);
    const manifests: ManifestIndex = {}
    let errors = 0
    for (const file of files) {
        if (!file.isFile) continue
        const manifest = loadManifest(`${folder}/${file.name}`)
        if (manifest) manifests[file.name] = manifest
        else errors++
    }
    if (errors != 0) Deno.exit(1)
    return manifests
}

function serializeManifests(index: ManifestIndex) {
    const converted: {[key: string]: string} = {}
    for (const [key, value] of Object.entries(index)) {
        converted[key] = convertToJSON(value, true)
    }
    return converted
}

export const serializedMenifests = serializeManifests(loadManifests())

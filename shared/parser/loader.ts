import { convertFromJSON, convertToJSON } from "./converters.ts";
import { ManifestIndex } from "./types.ts";

function loadManifest(path: string) {
    const content = Deno.readTextFileSync(path)
    const manifest = convertFromJSON(content)
    if (!manifest) {
        console.log("INVALID MANIFEST");
        return false
    }
    return manifest
}

export function loadManifests(): ManifestIndex {
    const folder = "../manifests"
    const files = Deno.readDirSync(folder);
    const manifests: ManifestIndex = {}
    let errors = 0
    for (const file of files) {
        if (!file.isFile) continue
        const manifest = loadManifest(`${folder}/${file.name}`)
        const fileNameWithoutJSON = file.name.substring(0, -5)
        if (manifest) manifests[fileNameWithoutJSON] = manifest
        else errors++
    }
    if (errors != 0) throw Error(`FATAL: ${errors} manifest have problems`)
    return manifests
}

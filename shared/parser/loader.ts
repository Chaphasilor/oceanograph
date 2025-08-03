// deno-lint-ignore-file no-explicit-any
import { parseIndex } from "./loaderBrowser.ts";
import { parseJSON } from "./parser.ts";
import { RawManifestIndex } from "./types.ts";

function loadManifest(file: string): object {
    const content = Deno.readTextFileSync(file)
    const obj = JSON.parse(content)
    // validation
    parseJSON(obj)

    return obj
}

export const loadManifests = () => parseIndex(loadUnparsedManifests())

/**
 * Returns a value that can be send to the browser
 */
export function loadUnparsedManifests() {
    const folder = "../manifests"
    const files = Deno.readDirSync(folder);
    const manifests: RawManifestIndex = {}

    for (const file of files) {
        if (!file.isFile) continue
        const index = file.name.replace(".json", "")
        try {
            manifests[index] = loadManifest(`${folder}/${file.name}`)
        } catch (e: any) {
            console.error(`ERROR: Failed to load "${file.name}", reason: ${e.message} `)
        }
    }

    return manifests
}

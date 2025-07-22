// deno-lint-ignore-file no-explicit-any
import { parseJSON } from "./parser.ts";
import { ManifestIndex, RawManifestIndex } from "./types.ts";

export function parseIndex(rawManifests: RawManifestIndex) {
    const manifests: ManifestIndex = {}

    for (const [key, value] of Object.entries(rawManifests)) {
        try {
            manifests[key] = parseJSON(value)
        } catch (e: any) {
            console.log(`ERROR: Failed to parse ${key} Manifest: ${e.message} `)
        }
    }

    return manifests
}

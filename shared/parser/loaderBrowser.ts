// deno-lint-ignore-file no-explicit-any
import { parseManifest } from "./parser.ts";
import { ManifestIndex, RawManifestIndex } from "./types.ts";

export function parseIndex(rawManifests: RawManifestIndex) {
    const manifests: ManifestIndex = {}

    for (const [key, value] of Object.entries(rawManifests)) {
        try {
            manifests[key] = parseManifest(value)
        } catch (e: any) {
            console.error(`ERROR: Failed to parse "${key}", reason: ${e.message} `)
        }
    }

    return manifests
}

import { Manifest } from "../parser/types.ts";

export function getSortedReleases(manifest: Manifest) {
    return manifest.metadata.releases.sort((a, b) => b.at.getTime() - a.at.getTime())
}

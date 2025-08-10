import { Capabilities, Features, Manifest, ManifestIndex } from "../parser/types.ts";

export function getSortedReleases(manifest: Manifest) {
    return manifest.releases.sort((a, b) => b.at.getTime() - a.at.getTime())
}

export function getFeatureStatus(index: ManifestIndex, manifest: keyof ManifestIndex, feature: Features) {
    const that = index[manifest]
    let other: Manifest | undefined;

    if (that.tandemManifest?.manifest) {
        other = index[that.tandemManifest?.manifest]
    }

    return {
        main: that.features[feature],
        tandem: other?.features[feature]
    }
}

export function getCapabilityStatus(index: ManifestIndex, manifest: keyof ManifestIndex, capability: Capabilities) {
    const that = index[manifest]
    let other: Manifest | undefined;

    if (that.tandemManifest?.manifest) {
        other = index[that.tandemManifest?.manifest]
    }

    return {
        main: that.capabilities[capability],
        tandem: other?.capabilities[capability]
    }
}

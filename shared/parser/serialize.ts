import { convertFromJSON, convertToJSON, manifestToNormalizedForm } from "./converters.ts";
import { ManifestIndex, InternalManifestIndex, InternalManifest } from "./types.ts";


export function deserializeManifests(index: {[key: string]: string}) {
    const converted: ManifestIndex = {}
    for (const [key, value] of Object.entries(index)) {
        const manifest = convertFromJSON(value)
        if (manifest) converted[key] = manifest
    }
    return converted
}


export function linkManifests(manifests: {[key: string]: InternalManifest<string>}) {
    let linked = manifests as any
    const isBeta: string[] = []

    for (const fileName of Object.keys(manifests)) {
        const betaFileName = manifests[fileName].metadata.betaManifest
        console.log({a: manifests[fileName].metadata.betaManifest})
        if (betaFileName) {
            linked[fileName].metadata.betaManifest
            delete manifests[betaFileName].metadata.betaManifest
            linked[fileName].metadata.betaManifest = manifests[betaFileName]
            delete manifests[betaFileName]
            isBeta.push(betaFileName)
        }
    }

    for (const beta of isBeta) {
        delete linked[beta]
    }

    return linked as InternalManifestIndex
}


export function deserializeStack(data: {[key: string]: string}): InternalManifestIndex {
    const index = deserializeManifests(data)
    const internals: {[key: string]: InternalManifest<string>} = {}
    for (const [key, value] of Object.entries(index)) {
        internals[key] = manifestToNormalizedForm(value)
    }
    return linkManifests(internals)
}

export function serializeManifests(index: ManifestIndex) {
    console.log(index)
    const converted: {[key: string]: string} = {}
    for (const [key, value] of Object.entries(index)) {
        converted[key] = convertToJSON(value, true)
    }
    return converted
}

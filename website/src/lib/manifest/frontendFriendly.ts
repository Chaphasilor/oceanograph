import { Platform, Language, Capabilities, Features, URLType } from "./types/enums"
import type { InternalAuthor, InternalManifest, Manifest } from "./types/interfaces"
import type { InternalManifestIndex, ManifestIndex } from "./types/types"


export const convertToJSON = (manifest: Manifest | InternalManifest<any>, compact?: true) => JSON.stringify(manifest, (key, value) => value, compact ? 0 : 2)


function toURL(value: string): URL {
    try {
        return new URL(value)
    } catch {
        throw Error(`"${value}" is not a valid URL`)
    }
}

function toDate(value: string): Date {
    const date = new Date(value)
    if (date.toString() == "Invalid Date") {
        throw Error(`"${value} is not a valid Date"`)
    }
    return date
}

function enumCheck(values: object, options: object) {
    for (const value of Object.keys(values)) {
        if (!(Object.values(options).includes(value))) {
            throw Error(`"${value}" is not supported. Typo?`)
        }
    }
}
function enumCheckFlat(values: string[], options: object) {
    for (const value of values) {
        if (!(Object.values(options).includes(value))) {
            throw Error(`"${value}" is not supported. Typo?`)
        }
    }
}

export function linkManifests(manifests: {[key: string]: InternalManifest<string>}) {
    let linked = manifests as any
    const isBeta: string[] = []

    for (const fileName of Object.keys(manifests)) {
        const betaFileName = manifests[fileName].metadata.betaManifest
        console.log({a: manifests[fileName].metadata.betaManifest})
        if (betaFileName) {
            linked[fileName].metadata.betaManifest
            // delete manifests[betaFileName].metadata.betaManifest
            linked[fileName].metadata.betaManifest = manifests[betaFileName]
            // delete manifests[betaFileName]
            isBeta.push(betaFileName)
        }
    }

    console.log({isBeta})

    for (const beta of isBeta) {
        delete linked[beta]
    }

    return linked as InternalManifestIndex
}

export function manifestToNormalizedForm(manifest: Manifest) {
    let internal = manifest as any
    internal.metadata.latestRelease = manifest.metadata.releases.sort((a, b) => a.at.getTime() - b.at.getTime())

    const givenPlatforms = Object.keys(manifest.metadata.platforms)
    for (const platform of Object.values(Platform)) {
        if (!givenPlatforms.includes(platform)) {
            internal.metadata.platforms[platform] = false
        }
    }

    if (manifest.metadata.cost == false) {
        internal.metadata.cost = "Free"
    }

    internal.metadata.authors = manifest.metadata.authors.map(author => {
        if (author.urls == undefined) author.urls = []
        return author
    }) as InternalAuthor[];

    internal.jellyfinCapabilites = manifest.jellyfinCapabilites
    const givenCapabilities= Object.keys(manifest.jellyfinCapabilites)
    for (const capability of Object.values(Capabilities)) {
        if (givenCapabilities.includes(capability)) {
            const value = manifest.jellyfinCapabilites[capability]
            const kind = typeof value
            if (kind == "string") {
                internal.jellyfinCapabilites[capability] = {
                    supported: true,
                    since: value
                }
            } else if (kind == "boolean") {
                internal.jellyfinCapabilites[capability] = {
                    supported: true,
                }
            } else if (kind == "object") {
                internal.jellyfinCapabilites[capability] = {
                    supported: true,
                    // @ts-ignore
                    comment: value.comment,
                    // @ts-ignore
                    since: value.since
                }
            }
        } else {
            internal.jellyfinCapabilites[capability] = { supported: false }
        }
    }

    internal.appFeatures = manifest.appFeatures
    const givenFeatures = Object.keys(manifest.appFeatures)
    for (const feature of Object.values(Features)) {
        if (givenFeatures.includes(feature)) {
            const value = manifest.appFeatures[feature]
            const kind = typeof value
            if (kind == "string") {
                internal.appFeatures[feature] = {
                    supported: true,
                    since: value
                }
            } else if (kind == "boolean") {
                internal.appFeatures[feature] = {
                    supported: true,
                }
            } else if (kind == "object") {
                internal.appFeatures[feature] = {
                    supported: true,
                    // @ts-ignore
                    comment: value.comment,
                    // @ts-ignore
                    since: value.since
                }
            }
        } else {
            internal.appFeatures[feature] = { supported: false }
        }
    }

    return internal as InternalManifest<string>
}


export function convertFromJSON(manifest: string): Manifest | false {
    // convert strings to objects with minimal error prevention
    let input: any, output: Manifest
    try {
        input = JSON.parse(manifest) as any
        output = input as Manifest

        output.metadata.updated.at = toDate(input.metadata.updated.at)
        output.metadata.releases = input.metadata.releases.map((release: any) => {
            release.at = toDate(release.at)
            return release
        })
        output.metadata.url = toURL(input.metadata.url)
        output.metadata.authors = input.metadata.authors.map((author: any) => {
            if (author.urls) author.urls = author.urls.map((url: any) => {
                url.url = toURL(url.url)
                return url
            })
            return author
        })
        output.metadata.community = input.metadata.community.map((community: any) => {
            community.url = toURL(community.url)
            return community
        })
        output.metadata.downloads = input.metadata.downloads.map((download: any) => {
            download.url = toURL(download.url)
            return download
        })
    } catch (e: any) {
        console.error("Parsing Error:", e.message)
        return false
    }

    const data = output as Manifest

    // stricter validator
    try {
        enumCheck(data.metadata.platforms, Platform)
        enumCheckFlat(data.metadata.code.languages, Language)
        enumCheck(data.jellyfinCapabilites, Capabilities)
        enumCheck(data.appFeatures, Features)
        data.metadata.authors.forEach(author => {
            const types = author.urls?.map(url => url.type)
            if (types) enumCheckFlat(types, URLType)
        })
        enumCheckFlat(data.metadata.community.map(community => community.type), URLType)
        enumCheckFlat(data.metadata.downloads.map(download => download.type), URLType)

    } catch (e: any) {
        console.error("Validation Error:", e.message)
        return false
    }

    return data
}

function deserializeManifests(index: {[key: string]: string}) {
    const converted: ManifestIndex = {}
    for (const [key, value] of Object.entries(index)) {
        const manifest = convertFromJSON(value)
        if (manifest) converted[key] = manifest
    }
    return converted
}
export function deserializeStack(data: {[key: string]: string}): InternalManifestIndex {
    const index = deserializeManifests(data)
    const internals: {[key: string]: InternalManifest<string>} = {}
    for (const [key, value] of Object.entries(index)) {
        internals[key] = manifestToNormalizedForm(value)
    }
    return linkManifests(internals)
}

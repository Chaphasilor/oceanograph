import { Language, Platform, TandemManifestShortNames, Capabilities, Features, Manifest, URLType } from "./types.ts";
import { dateParser, isBoolean, isNumber, isString, isStringOrBool, isStringsInEnum, urlParser } from "./validators.ts";


const exists = (v: any, path: string) => {
    if (v == undefined)
        throw Error(`Missing "${path}" but is required`)
}
export function parseJSON(obj: any) {
    exists(obj.metadata, ".metadata")
    exists(obj.metadata.updated, ".metadata.updated")

    exists(obj.metadata.updated.at, ".metadata.updated.at")
    obj.metadata.updated.at = dateParser(obj.metadata.updated.at, ".metadata.updated.at")

    exists(obj.metadata.updated.revisions, ".metadata.updated.at.revisions")
    isNumber(obj.metadata.updated.revisions, ".metadata.updated.at.revisions")

    exists(obj.metadata.releases, ".metadata.releases")
    obj.metadata.releases = obj.metadata.releases.map((release, index) => {
        exists(release.version, `.metadata.releases[${index}].version`)
        isString(release.version, `.metadata.releases[${index}].version`)

        exists(release.at, `.metadata.releases[${index}].at`)
        release.at = dateParser(release.at, `.metadata.releases[${index}].at`)

        return release
    })

    exists(obj.metadata.name, ".metadata.name")
    isString(obj.metadata.name, ".metadata.name")

    exists(obj.metadata.description, ".metadata.description")
    isString(obj.metadata.description, ".metadata.description")

    exists(obj.metadata.url, ".metadata.url")
    obj.metadata.url = urlParser(obj.metadata.url, ".metadata.url")

    exists(obj.metadata.platforms, ".metadata.platforms")
    Object.entries(obj.metadata.platforms).forEach(([key, value]) => {
        isStringsInEnum(key, Platform, `.metadata.platforms / key=${key}`)
        isStringOrBool(value, `.metadata.platforms[${key}]`)
    })

    exists(obj.metadata.code, ".metadata.code")
    exists(obj.metadata.code.license, ".metadata.code.license")
    isString(obj.metadata.code.license, ".metadata.code.license")

    exists(obj.metadata.code.openSource, ".metadata.code.openSource")
    isBoolean(obj.metadata.code.openSource, ".metadata.code.openSource")

    exists(obj.metadata.code.languages, ".metadata.code.languages")
    obj.metadata.code.languages.forEach((lang, index) => 
        isStringsInEnum(lang, Language, `.metadata.code.languages[${index}]`))

    exists(obj.metadata.cost, ".metadata.cost")
    isStringOrBool(obj.metadata.cost, ".metadata.cost")

    exists(obj.metadata.authors, ".metadata.authors")
    obj.metadata.authors = obj.metadata.authors.map((author, index) => {
        exists(author.name, `.metadata.authors[${index}].name`)
        isString(author.name, `.metadata.authors[${index}].name`)

        if (author.urls) {
            author.urls = author.urls.map((url, index2) => {
                exists(url.type, `.metadata.authors[${index}].urls[${index2}].type`)
                isStringsInEnum(url.type, URLType, `.metadata.authors[${index}].urls[${index2}].type`)

                exists(url.url, `.metadata.authors[${index}].urls[${index2}].url`)
                url.url = urlParser(url.url, `.metadata.authors[${index}].urls[${index2}].url`)

                return url
            })
        }

        return author
    })

    exists(obj.metadata.official, ".metadata.official")
    isBoolean(obj.metadata.official, ".metadata.official")

    exists(obj.metadata.community, ".metadata.community")
    obj.metadata.community = obj.metadata.community.map((url, index) => {
        exists(url.type, `.metadata.community${index}].type`)
        isStringsInEnum(url.type, URLType, `.metadata.community[${index}].type`)

        exists(url.url, `.metadata.community[${index}].url`)
        url.url = urlParser(url.url, `.metadata.community[${index}].url`)

        return url
    })

    exists(obj.metadata.downloads, ".metadata.downloads")
    obj.metadata.downloads = obj.metadata.downloads.map((url, index) => {
        exists(url.type, `.metadata.downloads[${index}].type`)
        isStringsInEnum(url.type, URLType, `.metadata.downloads[${index}].type`)

        exists(url.url, `.metadata.downloads[${index}].url`)
        url.url = urlParser(url.url, `.metadata.downloads[${index}].url`)

        return url
    })


    if (obj.metadata.tandemManifest) {
        exists(obj.metadata.tandemManifest.manifest, ".metadata.tandemManifest.manifest")
        isString(obj.metadata.tandemManifest.manifest, ".metadata.tandemManifest.manifest")

        exists(obj.metadata.tandemManifest.shortName, ".metadata.tandemManifest.shortName")
        isStringsInEnum(obj.metadata.tandemManifest.shortName, TandemManifestShortNames, ".metadata.tandemManifest.shortName")
    }

    exists(obj.metadata.jellyfinVersion.min, ".metadata.jellyfinVersion.min")
    isString(obj.metadata.jellyfinVersion.min, ".metadata.jellyfinVersion.min")

    exists(obj.metadata.jellyfinVersion.min, ".metadata.jellyfinVersion.max")
    isString(obj.metadata.jellyfinVersion.min, ".metadata.jellyfinVersion.max")

    exists(obj.capabilities, ".capabilities")
    Object.entries(obj.capabilities).forEach(([key, value]: [string, any]) => {
        isStringsInEnum(key, Capabilities, `.capabilities / key=${key}`)

        try {
            isStringOrBool(value, "")
        } catch {
            exists(value.comment, `.capabilities.platforms[${key}].comment`)
            isString(value.comment, `.capabilities.platforms[${key}].comment`)
            if (value.since) {
                isString(value.since, `.capabilities.platforms[${key}].since`)
            }
        }
    })

    exists(obj.features, ".features")
    Object.entries(obj.features).forEach(([key, value]: [string, any]) => {
        isStringsInEnum(key, Features, `.features / key=${key}`)

        try {
            isStringOrBool(value, "")
        } catch {
            exists(value.comment, `.features.platforms[${key}].comment`)
            isString(value.comment, `.features.platforms[${key}].comment`)
            if (value.since) {
                isString(value.since, `.features.platforms[${key}].since`)
            }
        }
    })

    return obj as Manifest
}

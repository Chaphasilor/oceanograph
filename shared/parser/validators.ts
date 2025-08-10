// deno-lint-ignore-file
import { Author, Capabilities, Capability, cURL, Language, Platform, Release, TandemManifest, TandemManifestKinds, URLType, valueTypes, Version } from "./types.ts";

const isArray = (x: any, path: string) => {
    if (!Array.isArray(x))
        throw Error(`value at "${path}" is not an array even though an array is expected`)
}

export function cUrlParser(obj:object, path: string): cURL {
    const value = eval(`obj${path}`)
    if (value.url == undefined) throw Error(`missing ".url" for cURL entry at "${path}"`)
    if (value.type == undefined) throw Error(`missing ".type" for cURL entry at "${path}"`)
    isStringsInEnum(value.type, URLType, `${path}.type`)
    try {
        return {
            url: new URL(value.url),
            type: value.type
        }
    } catch {/* Empty */}
    throw Error(`"${value}" at "${path}.url" is not a valid URL`)
}

export function cUrlArrayParser(obj:object, path: string): cURL[] {
    const value = eval(`obj${path}`)
    isArray(value, path)
    return (value as any[]).map((_, index) => cUrlParser(obj, `${path}[${index}]`))
}
export function authorParser(obj: object, path: string): Author {
    return {
        name: isString(obj, `${path}.name`),
        urls: cUrlArrayParser(obj, `${path}.urls`)
    }
}
export function authorArrayParser(obj: object, path: string): Author[] {
    const value = eval(`obj${path}`)
    isArray(value, path)
    return (value as any[]).map((_, index) => authorParser(obj, `${path}[${index}]`))
}

export function releaseParser(obj: object, path: string): Release {
    return {
        version: isString(obj, `${path}.version`),
        at: dateParser(obj, `${path}.at`)
    }
}
export function isPlatformObj(obj: object, path: string): { [key in Platform]?: Version | true } {
    const value = eval(`obj${path}`)
    if (value == undefined) throw Error(`Platforms Object required but missing at "${path}"`)

    Object.entries(value).forEach(([key, value]) => {
        isStringsInEnum(key, Platform, `${path}["${key}"]`)
        isStringOrBool(obj, `${path}["${key}"]`)
    })
    
    return value
}

export function releaseArrayParser(obj: object, path: string): Release[] {
    const value = eval(`obj${path}`)
    isArray(value, path)
    return (value as any[]).map((_, index) => releaseParser(obj, `${path}[${index}]`))
}
export function isLanguageArray(obj: object, path: string): Language[] {
    const value = eval(`obj${path}`)
    isArray(value, path)
    return (value as any[]).map((v, index) => isStringsInEnum(v, Language, `${path}[${index}]` )) as Language[]
}

export function dateParser(obj:object, path: string): Date {
    const value = eval(`obj${path}`)
    const date = new Date(value)
    if (date.toString() == "Invalid Date") {
        throw Error(`"${value}" at "${path}" is not a valid Date`)
    }
    return date
}
export function isTandemManifest(obj:object, path: string): TandemManifest | undefined{
    const value = eval(`obj${path}`)
    if (value == undefined) return undefined
    if (typeof value != "object") throw Error(`optional TandemManifest at "${path}" needs to be undefined or object`)
    isString(obj, `${path}.manifest`)
    isStringsInEnum(value.kind, TandemManifestKinds, `${path}.kind`)
    return value
}

export function isType(obj:object, type: valueTypes, path: string, optional: boolean = false) {
    const value = eval(`obj${path}`)
    if (value == undefined && optional) return value
    // deo-lint-ignore vanlid-typeof
    if (typeof value == type) return value
    throw Error(`"${value}" at "${path}" is not a of type ${type}`)
}

export function isTypes(obj:object, types: valueTypes[], path: string) {
    const value = eval(`obj${path}`)
    if (types.includes(typeof value)) return value
    throw Error(`"${value}" at "${path}" is not any of these types "${types.join(", ")}"`)
}

export const isNumber = (obj:object, path: string) => isType(obj, "number", path)
export const isString = (obj:object, path: string, optional: boolean = false) => isType(obj, "string", path, optional)
export const isBoolean = (obj:object, path: string) => isType(obj, "boolean", path)
export const isStringOrBool = (obj:object, path: string) => isTypes(obj, ["string", "boolean"], path)
/** options = the enum */
export function isStringsInEnum(str:string, options: object, path: string) {
    if (!(Object.values(options).includes(str))) {
        throw Error(`"${str}" at "${path}" is not a valid value for this field. Allowed values are: "${Object.values(options).join(", ")}"`)
    }
    return str
}

export function isCapabilityObj(obj: object, path: string, _enum: object): {[key: string]: Capability} {
    const value = eval(`obj${path}`)
    if (value == undefined) throw Error(`Capability Object required but missing at "${path}"`)
    Object.entries(value).forEach(([key, value]) => {
        isStringsInEnum(key, _enum, `${path}.${key}`)
        isString(obj, `${path}["${key}"].comment`, true)
        isString(obj, `${path}["${key}"].since`, true)
    })
    return value 
}

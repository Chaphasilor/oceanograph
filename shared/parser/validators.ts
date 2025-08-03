// deno-lint-ignore-file
import { valueTypes } from "./types.ts";

export function urlParser(value: string, path: string): URL {
    try {
        return new URL(value)
    } catch {/* Empty */}
    throw Error(`"${value}" at "${path}" is not a valid URL`)
}

export function dateParser(value: string, path: string): Date {
    const date = new Date(value)
    if (date.toString() == "Invalid Date") {
        throw Error(`"${value}" at "${path}" is not a valid Date`)
    }
    return date
}

export function isType(value: any, type: valueTypes, path: string) {
    // deo-lint-ignore vanlid-typeof
    if (typeof value == type) return value
    throw Error(`"${value}" at "${path}" is not a valid ${type}`)
}

export function isTypes(value: any, types: valueTypes[], path: string) {
    if (types.includes(typeof value)) return value
    throw Error(`"${value}" at "${path}" is not any of these types "${types.join(", ")}"`)
}

export const isNumber = (v:any, path: string) => isType(v, "number", path)
export const isString = (v:any, path: string) => isType(v, "string", path)
export const isBoolean = (v:any, path: string) => isType(v, "boolean", path)
export const isStringOrBool = (v:any, path: string) => isTypes(v, ["string", "boolean"], path)
/** options = the enum */
export function isStringsInEnum(value: string, options: object, path: string) {
    if (!(Object.values(options).includes(value))) {
        throw Error(`"${value}" at "${path}" is not a valid value for this field. Allowed values are: "${Object.values(options).join(", ")}"`)
    }
    return value
}

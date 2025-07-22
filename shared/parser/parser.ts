// deno-lint-ignore-file no-explicit-any
import { Capabilities, Features, Language, URLType, valueTypes, Platform, Manifest } from "./types.ts";

function urlParser(value: string): URL {
    // URL does throw errors already
    return new URL(value)
}

function dateParser(value: string): Date {
    const date = new Date(value)
    if (date.toString() == "Invalid Date") {
        throw Error(`"${value} is not a valid Date"`)
    }
    return date
}

function isType(value: any, type: valueTypes) {
    // deo-lint-ignore vanlid-typeof
    if (typeof value == type) return value
    throw Error(`"${value} is not a valid ${type}"`)
}

function isTypes(value: any, types: valueTypes[]) {
    if (types.includes(typeof value)) return value
    throw Error(`"${value}" is not of type "${types.join(", ")}"`)
}

function isCapability(value: any) {
    if (typeof value == "string") return value
    if (typeof value == "boolean") return value
    try {
        if (typeof value.comment == "string") return value
        if (typeof value.since == "string" || value.since == undefined) return value
    } catch { /* Empty */ }
    throw Error(`Invalid Capability Detected`)
}

const isNumber = (v:any) => isType(v, "number")
const isString = (v:any) => isType(v, "string")
const isBoolean = (v:any) => isType(v, "boolean")
const isStringOrBool = (v:any) => isTypes(v, ["string", "boolean"])
/** options = the enum */
function isStringsInEnum(value: string, options: object) {
    if (!(Object.values(options).includes(value))) {
        throw Error(`"${value}" is not a Supported value, allowed values are: "${Object.values(options).join(", ")}". Typo? `)
    }
    return value
}

/**
 * OPERATORS
 * . = static path
 * ? = dont error when undefined
 * * = flatten the array
 * < = all keys of an object
 * > = all values of an object
 * 
 * the order is: <operator> <location>
 * where the operator is applied on the location (except < and >)
 */
const parsersAndValidators = {
    ".metadata.updated.at":          dateParser,
    ".metadata.updated.revisions":   isNumber,
    ".metadata.releases*version":    isString,
    ".metadata.releases?*at":        dateParser,
    ".metadata.name":                isString,
    ".metadata.url":                 urlParser,
    ".metadata.platforms<":          (v: any) => isStringsInEnum(v, Platform),
    ".metadata.platforms>":          isStringOrBool,
    ".metadata.code.languages*":     (v: any) => isStringsInEnum(v, Language),
    ".metadata.code.openSource":     isBoolean,
    ".metadata.code.license":        isString,
    ".metadata.cost":                isStringOrBool,
    ".metadata.authors*name":        isString,
    ".metadata.authors?*urls*type":  (v: any) => isStringsInEnum(v, URLType),
    ".metadata.authors?*urls*url":   urlParser,
    ".metadata.official":            isBoolean,
    ".metadata.community*type":      (v: any) => isStringsInEnum(v, URLType),
    ".metadata.community*url":       urlParser,
    ".metadata.downloads*type":      (v: any) => isStringsInEnum(v, URLType),
    ".metadata.downloads*url":       urlParser,
    ".metadata?.betaManifest":       isString,
    ".jellyfinVersion.min":          isString,
    ".jellyfinVersion.max":          isString,
    ".jellyfinCapabilites<":         (v: any) => isStringsInEnum(v, Capabilities),
    ".jellyfinCapabilites>":         isCapability,
    ".appFeatures<":                 (v: any) => isStringsInEnum(v, Features),
    ".appFeatures>":                 isCapability
}


function* tokenIterator(position: string) {
    /**
     * Matches operators (. * < > ?) and the words in between as groups
     * ```js
     * Array.from("metadata.authors*urls?url>".matchAll(regex) 
     * // metadata | . | authors | * | urls | ? | url | > | |
     * ```
     */
    const regex = /[.<>*?]|[^.<>*?]*/gm

    position = position.replaceAll("*", "*.")
    const tokens = Array.from(position.matchAll(regex)).map(String);

    // +2 so token and words are together
    for (let i = 0; i < tokens.length; i+=2) {
        let operator = tokens[i]
        const optional = operator == "?"
        if (optional) {
            // ? operator follows up by another operator, so a shift needs to happen
            i++
            operator = tokens[i]
        }
        if (!(".*<>?".includes(operator))){
            // when * is used the next value is . (replaced before the loop)
            // so we need to only move on step to the right
            // since the loop moves 2 at a time, we need to go 3 back
            i-=3
            continue;
        }
        const location = tokens[i+1]
        const lookahead = tokens[i+2]

        const lastKey = lookahead == "" || lookahead == undefined

        yield {operator, location, lastKey, optional}
    }
}

type FlatObj = {path: (string | number)[]; value: any, key?: any}
function pathMatchTest(position: string, data: FlatObj) {
    const path = data.path;
    let index = 0

    // check if path is correct
    for (const {operator, location, lastKey, optional} of tokenIterator(position)) {
        const curr = path[index]
        const next = path[index+1]
        switch (operator) {
            // Access Object value
            // Path value needs to be an object key (aka string) and
            // equal the expected value
            case ".":
                if (typeof curr == "string") {
                    if (curr == location) {
                        index++
                        break;
                    }
                } else if (optional && curr == undefined) {
                    return data
                }
                return false

            // Array values
            // Number is always an array
            case "*":
                if (typeof curr == "number") {
                    index++
                    break;
                } else if (optional && curr == undefined) return data
                
                return false
        
            // Keys of object
            // Since object keys can only be string and not contain deeper paths
            // the next value shouldnt exist
            case "<":
                if (typeof curr == "string" && next == undefined) {
                    data.key = location; // bc the real value isnt the target
                    data.value = path.at(-1)
                    index++
                    return data
                }
                return false

            // Values of object
            // No path values should follow
            case ">":
                if (next == undefined) {
                    break;
                }
                return false
        }

        if (next == undefined && optional) return data;
        if (lastKey) return data;
    }

    return data
}

function flattenObject(obj: any, path:(string|number)[]=[], flat:FlatObj[] = []) {
    if (["string", "boolean", "number"].includes(typeof obj) || obj == undefined || obj == null) {
        flat.push({path, value: obj})
        return flat
    }

    if (obj instanceof Array) {
        obj.forEach((v, i) => {
            const path2 = path.slice()
            path2.push(i)
            flattenObject(v, path2, flat)
        })
    } else {
        Object.entries(obj).forEach(([key, value]) => {
            const path2 = path.slice()
            path2.push(key)
            flattenObject(value, path2, flat)
        })
    }

    return flat
}


function replaceValue(obj: object, path: (string|number)[], value: any, key?: any) {
    let working = obj

    for (let i = 0; i<path.length; i++) {
        const step = path[i]
        const isLast = i == path.length-1
        const isArray = typeof step == "number"

        if (!isArray) {
            // @ts-expect-error Since TS is unsure what working actually is it doesnt know it can be indexed by a string and number
            if (isLast) working[key??step] = value
        }
        // @ts-expect-error Since TS is unsure what working actually is it doesnt know it can be indexed by a string and number
        working = working[step]
    }

    return obj
}

/**
 * This is a bit wild so here is the general break down
 * 
 * First converts an object like
 * ```js
 * {
 *  a: {
 *      b: [
 *          {c: "Hello"},
 *          {c: "World"}
 *      ]
 *  }
 * }
 * ```
 * into a flat representation like
 * ```js
 * [
 *  {
 *      path: ["a", "b", 0, "c"]
 *      value: "Hello" 
 *  },
 *  {
 *      path: ["a", "b", 1, "c"]
 *      value: "Hello" 
 *  },
 * ]
 * ``` 
 * 
 * then we go through each flattened values and also through every parser config like
 * ```
 * {
 *  // ...
 *  ".metadata.downloads*url": urlParser,
 *  // ..
 * }
 * ```
 * We then filter for a matching parser key (path), if a key matches the given parser is applied.
 * Parsers will throw an error if the value is invalid.
 * After a parser is applied the value overwrites the original one
 * 
 * Finally we remove the just parsed value from the flattend object to prevent false posivits
 */
export function parseJSON(data: object) {
    const flattened = flattenObject(data)
    for (const [targetPath, parser] of Object.entries(parsersAndValidators)) {
        for (const valuePathPair of flattened) {
            const modified = pathMatchTest(targetPath, valuePathPair)
            if (modified) {
                const parsed = parser(valuePathPair.value)
                if (parsed !== valuePathPair.value) {
                    data = replaceValue({...data}, valuePathPair.path, parsed, modified.key)
                }
            }
        }
    }
    return data as Manifest
}

export const unparseManifest = (data: Manifest) => JSON.parse(JSON.stringify(data)) as object


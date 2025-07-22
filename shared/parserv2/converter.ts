import { Capabilities, Features, Language, Parser, URLType, valueTypes, Platform } from "./types.ts";


function toURL(value: URL): string;
function toURL(value: string): URL;
function toURL(value: URL | string): string | URL {
    if (typeof value == "string") {
        // URL does throw errors already
        return new URL(value)
    }
    return value.toString()
}
const urlParser: Parser<Date> = toURL

function toDate(value: Date): string;
function toDate(value: string): Date;
function toDate(value: Date | string): string | Date {
    if (typeof value == "string") {
        const date = new Date(value)
        if (date.toString() == "Invalid Date") {
            throw Error(`"${value} is not a valid Date"`)
        }
        return date
    }
    return value.toISOString()
}
const dateParser: Parser<Date> = toDate;

function isType(value: any, type: valueTypes) {
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

const isNumber = v => isType(v, "number")
const isString = v => isType(v, "string")
const isBoolean = v => isType(v, "boolean")
const isStringOrBool = v => isTypes(v, ["string", "boolean"])
/** options = the enum */
function isStringsInEnum(value: string, options: object) {
    if (!(Object.values(options).includes(value))) {
        throw Error(`"${value}" is not a Supported value. Typo? `)
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
    ".metadata.platforms<":          (v) => isStringsInEnum(v, Platform),
    ".metadata.platforms>":          isStringOrBool,
    ".metadata.code.languages*":     (v) => isStringsInEnum(v, Language),
    ".metadata.code.openSource":     isBoolean,
    ".metadata.code.license":        isString,
    ".metadata.cost":                isStringOrBool,
    ".metadata.authors*name":        isString,
    ".metadata.authors?*urls*type":  (v) => isStringsInEnum(v, URLType),
    ".metadata.authors?*urls*url":   urlParser,
    ".metadata.official":            isBoolean,
    ".metadata.community*type":      (v) => isStringsInEnum(v, URLType),
    ".metadata.community*url":       urlParser,
    ".metadata.downloads*type":      (v) => isStringsInEnum(v, URLType),
    ".metadata.downloads*url":       urlParser,
    ".metadata?.betaManifest":       isString,
    ".jellyfinVersion.min":          isString,
    ".jellyfinVersion.max":          isString,
    ".jellyfinCapabilites<":         (v) => isStringsInEnum(v, Capabilities),
    ".jellyfinCapabilites>":         isCapability,
    ".appFeatures<":                 (v) => isStringsInEnum(v, Features),
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
        const location = tokens[i+1]
        const lookahead = tokens[i+2]

        yield {operator, location, lookahead, optional}
    }
}

function getValuesFromPosition(position: string, data: object) {
    let activeData:any[] = [data];
    for (const {operator, location, lookahead, optional} of tokenIterator(position)) {

        const exists = (v: any) => {
            const is = v != undefined && v != null
            if (!optional && !is) throw Error(`"${position}" is required but value is missing.`)
        }

        switch (operator) {
            case ".":
                activeData = activeData.map((v, i) => {
                    exists(v[location])
                    return v[location]
                });
                break;
            case "*":
                if (location == "") {
                    activeData = activeData.flat(1)
                } else {
                    activeData = activeData.map(v => {
                        return v.map(v => {
                            exists(v[location])
                            return v[location]
                        })
                    }).flat(1);
                }
                break
            case "<":
                activeData = activeData.map(v => {
                    return Object.keys(v)
                }).flat(1)
                break
            case ">":
                activeData = activeData.map(v => {
                    return Object.values(v)
                }).flat(1)
                break
            }
        activeData = activeData.filter(v => !!v)

        if (lookahead == "" || lookahead == undefined) break;
    }

    return activeData
}

function parseJSON(data: object) {
    for (const [position, fn] of Object.entries(parsersAndValidators)) {
        const values = getValuesFromPosition(position, data).map(fn)
        console.log({position, values})
    }
}


parseJSON({
    "metadata": {
        "updated": {
            "at": "2025-07-19T11:00:57.703Z",
            "revisions": 1
        },
        "releases": [
            {
                "version": "0.9.18",
                "at": null
            }
        ],
        "name": "Finamp",
        "url": "https://github.com/jmshrv/finamp",
        "platforms": {
            "Android": true,
            "iOS": true,
            "Linux": true,
            "MacOS": true,
            "Windows": true
        },
        "code": {
            "languages": [
                "Flutter",
                "Dart"
            ],
            "license": "MLP - 2.0",
            "openSource": true
        },
        "cost": false,
        "authors": [
            {
                "name": "jmshrv"
            },
            {
                "name": "Chaphasilor",
                "urls": [
                    {
                        "type": "Github",
                        "url": "https://github.com/Chaphasilor/"
                    },
                    {
                        "type": "Mastodon",
                        "url": "https://toot.io/@chaphasilor"
                    }
                ]
            }
        ],
        "official": false,
        "community": [
            {
                "type": "Discord",
                "url": "https://discord.gg/xh9SZ73jWk"
            }
        ],
        "downloads": [
            {
                "type": "Google Play",
                "url": "https://play.google.com/store/apps/details?id=com.unicornsonlsd.finamp"
            },
            {
                "type": "F-Droid",
                "url": "https://f-droid.org/packages/com.unicornsonlsd.finamp/"
            },
            {
                "type": "App Store",
                "url": "https://apps.apple.com/us/app/finamp/id1574922594"
            },
            {
                "type": "Github",
                "url": "https://github.com/jmshrv/finamp/releases/"
            }
        ],
        "betaManifest": "finamp-beta.json"
    },
    "jellyfinVersion": {
        "min": "9.0.0",
        "max": "10.0.0"
    },
    "jellyfinCapabilites": {
        "Play On": true,
        "Synced Lyrics": {
            "comment": "Nothing to comment on :)",
            "since": "0.9.15"
        },
        "Word Synced Lyrics": {
            "comment": "Waiting for upstream fix"
        },
        "Lyrics": "0.9.14",
        "Transcoding": true
    },
    "appFeatures": {
        "Offline Playback": true,
        "Screen Reader": "0.9.18"
    }
})


// console.log(getValuesFromPosition(".a.b?c", {a: {b: {}}}))

export function toURL(value: string): URL {
    try {
        return new URL(value)
    } catch {
        throw Error(`"${value}" is not a valid URL`)
    }
}
export function toDate(value: string): Date {
    const date = new Date(value)
    if (date.toString() == "Invalid Date") {
        throw Error(`"${value} is not a valid Date"`)
    }
    return date
}
export function enumCheck(values: object, options: object) {
    for (const value of Object.keys(values)) {
        if (!(Object.values(options).includes(value))) {
            throw Error(`"${value}" is not supported. Typo?`)
        }
    }
}
export function enumCheckFlat(values: string[], options: object) {
    for (const value of values) {
        if (!(Object.values(options).includes(value))) {
            throw Error(`"${value}" is not supported. Typo?`)
        }
    }
}

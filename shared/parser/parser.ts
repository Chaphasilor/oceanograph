import { Capabilities, Features, Manifest } from "./types.ts";
import {
    authorArrayParser,
    cUrlArrayParser,
    cUrlParser,
    dateParser,
    isBoolean,
    isCapabilityObj,
    isLanguageArray,
    isPlatformObj,
    isString,
    isStringOrBool,
    isTandemManifest,
    releaseArrayParser,
} from "./validators.ts";

/**
 * Doubles as validator
 */
export function parseManifest(obj: Partial<Manifest>): Manifest {
    return {
        updatedAt: dateParser(obj, ".updatedAt"),
        name: isString(obj, ".name"),
        official: isBoolean(obj, ".official"),
        description: isString(obj, ".description"),
        url: cUrlParser(obj, ".url"),
        downloads: cUrlArrayParser(obj, ".downloads"),
        authors: authorArrayParser(obj, ".authors"),
        community: cUrlArrayParser(obj, ".community"),
        releases: releaseArrayParser(obj, ".releases"),
        platforms: isPlatformObj(obj, ".platforms"),
        license: isString(obj, ".license"),
        openSource: isBoolean(obj, ".openSource"),
        cost: isStringOrBool(obj, ".cost"),
        languages: isLanguageArray(obj, ".languages"),
        minServer: isString(obj, ".minServer", true),
        maxServer: isString(obj, ".maxServer", true),
        tandemManifest: isTandemManifest(obj, ".tandemManifest"),
        capabilities: isCapabilityObj(obj, ".capabilities", Capabilities),
        features: isCapabilityObj(obj, ".features", Features),
    };
}

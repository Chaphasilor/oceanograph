import { URLType, Platform, Language, Capabilities, Features } from "./enums"
import type { Version, Name, Pricing, Capability } from "./types"

export interface InternalCapability {
    supported: boolean
    comment?: string,
    since?: Version,
}

/**
 * Custom URL / URL Wrapper
 */
export interface cURL {
    type: URLType,
    url: URL
}
export interface Author {
    name: Name,
    urls?: cURL[]
}
export interface InternalAuthor {
    name: Name,
    urls: cURL[]
}

export interface Manifest {
    metadata: {
        updated: {
            at: Date,
            /**
             * Auto increases everytime its imported into the editor
             */
            revisions: number
        },
        releases: {
            version: Version,
            at: Date
        }[],
        name: string,
        url: URL,
        /**
         * key  = Platform
         * value = version ; true = version unknown
         * missing entry = not supported
         */
        platforms: { [key in Platform]?: Version | true },
        code: {
            languages: Language[],
            openSource: boolean,
            license: string
        },
        /**
         * Can be anything since its either monthly fee,
         * yearly fee, onetime payment etc.
         * Cant really put that into a single enum
         *
         * false = Free
         */
        cost: Pricing | false,
        authors: Author[],
        offical: boolean,
        community: cURL[],
        downloads: cURL[],
        betaManifest?: string,
    },
    jellyfinCompatibility: {
        minServerVersion: Version,
        maxServerVersion: Version
    },
    jellyfinCapabilites: { [key in Capabilities]?: Capability },
    appFeatures: { [key in Features]?: Capability }
}

export interface InternalManifest<T> {
    metadata: {
        updated: {
            at: Date,
            revisions: number
        },
        releases: {
            version: Version,
            at: Date
        }[],
        latestRelease: {
            verion: Version,
            at: Date
        }
        name: string,
        url: URL
        platforms: { [key in Platform]: Version | boolean },
        code: {
            languages: Language[],
            openSource: boolean,
            license: string
        },
        /**
         * Can be anything since its either monthly fee,
         * yearly fee, onetime payment etc.
         * Cant really put that into a single enum
         *
         * false = Free
         */
        cost: Pricing,
        authors: InternalAuthor[],
        offical: boolean,
        community: cURL[],
        downloads: cURL[],
        betaManifest?: T,
    },
    jellyfinCompatibility: {
        minServerVersion: Version,
        maxServerVersion: Version
    },
    jellyfinCapabilites: { [key in Capabilities]: InternalCapability },
    appFeatures: { [key in Features]: InternalCapability }
}

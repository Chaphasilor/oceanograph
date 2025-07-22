export enum Platform {
    linux   = "Linux",
    windows = "Windows",
    macos   = "MacOS",
    ios     = "iOS",
    android = "Android",
    web     = "Web"
}
export enum Language {
    dart    = "Dart",
    flutter = "Flutter",
    html    = "HTML",
    js      = "Javascript",
    css     = "CSS",
    swift   = "Swift",
    java    = "Java",
    kotlin  = "Kotlin"
}

export enum URLType {
    github     = "Github",
    mastodon   = "Mastodon",
    discord    = "Discord",
    generic    = "Generic",
    googlePlay = "Google Play",
    appStore   = "App Store",
    testflight = "Test Flight",
    fDroid     = "F-Droid",
    flatpak    = "Flatpak",
    aur        = "AUR",
}
export enum Capabilities {
    playOn      = "Play On",
    transcoding = "Transcoding",
    lyrics      = "Lyrics",
    syncLyrics  = "Synced Lyrics",
    wSyncLyrics = "Word Synced Lyrics",
}
export enum Features {
    offlinePlay       = "Offline Playback",
    screenReader      = "Screen Reader",
    highContrastTheme = "High Contrast Theme",
}

export type Capability = Version | true | {
    comment: string,
    /** When Since is missing then no exact version is known */
    since?: Version
}
export type Version = string
export type Name = string
export type Pricing = string
export type ManifestIndex = { [fileName: string]: Manifest }
export type InternalManifestIndex = { [fileName: string]: InternalManifest<InternalManifest<undefined>> }
export type valueTypes = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"

export type Parser<V> = <T extends V | string = V | string>(value: T) => T extends string ? V : string;

export interface InternalCapability {
    supported: boolean
    comment?: string,
    since: Version,
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
        official: boolean,
        community: cURL[],
        downloads: cURL[],
        betaManifest?: string,
    },
    jellyfinVersion: {
        min: Version,
        max: Version
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
        official: boolean,
        community: cURL[],
        downloads: cURL[],
        betaManifest?: T,
    },
    jellyfinVersion: {
        min: Version,
        max: Version
    },
    jellyfinCapabilites: { [key in Capabilities]: InternalCapability },
    appFeatures: { [key in Features]: InternalCapability }
}

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
export enum TandemManifestShortNames {
    stable  = "stable",
    beta    = "beta"
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
export type RawManifestIndex = { [fileName: string]: object }
export type valueTypes = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"

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

export interface Manifest {
    metadata: {
        updated: {
            at: Date,
            /**
             * Auto increases every time its imported into the editor
             */
            revisions: number
        },
        releases: {
            version: Version,
            at: Date
        }[],
        name: string,
        description: string,
        url: URL,
        /**
         * key  = Platform
         * value = version ; true = version unknown
         * missing entry = not supported
         */
        platforms: { [key in Platform]?: Version | true },
        code: {
            license: string
            openSource: boolean,
            languages: Language[],
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
        tandemManifest?: {
            manifest: string,
            shortName: TandemManifestShortNames
        },
        jellyfinVersion: {
            min: Version,
            max: Version
        },
    },
    capabilities: { [key in Capabilities]?: Capability },
    features: { [key in Features]?: Capability }
}

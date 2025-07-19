import type { InternalManifest, Manifest } from "./interfaces"

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

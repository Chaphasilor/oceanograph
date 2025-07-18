export type Capability = Version | true | {
    comment: string,
    /** When Since is missing then no exact version is known */
    since?: Version
}
export type Version = string
export type Name = string
export type Pricing = string

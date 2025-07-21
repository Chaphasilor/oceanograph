import { serializeManifests } from "shared/parser/serialize"
import { loadManifests } from "shared/parser/loader"

export const serializedManifests = serializeManifests(loadManifests())

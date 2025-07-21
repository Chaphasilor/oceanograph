import { serializedManifests } from "$lib";

export const load = async () => {
    return {manifests: serializedManifests}
};

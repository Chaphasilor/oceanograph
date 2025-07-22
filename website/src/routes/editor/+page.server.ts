import { serializedManifests } from "$lib";

export const load = async () => {
    console.log(serializedManifests)
    return { manifests: serializedManifests }
};


export const ssr = false

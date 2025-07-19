import { serializedMenifests } from "$lib/manifest";

export const load = async () => {
    return {manifests: serializedMenifests}
};

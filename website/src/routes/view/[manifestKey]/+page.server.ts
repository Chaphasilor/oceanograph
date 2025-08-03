import { serializedManifests } from '$lib';
import { error } from '@sveltejs/kit';

export const ssr = false
export const load = async ({params}) => {
    const keys = Object.keys(serializedManifests)    
    if (!keys.includes(params.manifestKey)) {
        return error(404, "Manifest not Found")
    }
};


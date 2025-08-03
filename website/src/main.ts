import { browser } from "$app/environment";
import { parseIndex } from "shared/parser/loaderBrowser";


export const manifests = browser
    ? await fetch("/api", {priority: "high"})
      .then(async (response) => parseIndex(await response.json()))
    : {}

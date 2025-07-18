# oceanograph

A compatibility database for the Jellyfin ecosystem, tracking client features, server compatibility, and general information across Jellyfin clients.

## Overview

oceanograph aggregates and tracks compatibility information for Jellyfin clients, providing a centralized resource for users and developers to understand:

- **Feature Support**: Which Jellyfin features are supported by each client
- **Version Compatibility**: Since which app version each feature became available
- **Server Compatibility**: Which Jellyfin server versions each client supports
- **Client Information**: General details about each client including authors, licenses, and download links

## Why?

The Jellyfin ecosystem is pretty fragmented, with tons of clients, each supporting *some* features but usually not *all*. oceanograph aims to properly identify those differences, especially for newly-added Jellyfin features.  
In short, it tries to:

- **Track Feature Rollouts**
  - Monitor when new Jellyfin features become supported across clients
- **Track Server-Client Compatibility** across versions
- **Simplify Client Selection**
  - Help users choose the right client for their needs
- **Defragment the Jellyfin ecosystem**
  - Long-term we'd love to see clients filling in their respective gaps and/or focusing on their unique features that set them apart.

## Contributing

We welcome contributions to help keep oceanograph accurate and up-to-date!

### How to Contribute

TODO

## oceanograph Manifest

oceanograph can scan repositories for JSON manifests. This way client developers can simply update the manifest file as part of a PR, and oceanograph will pick it up as soon as the changes are merged.
There is a template manifest in this repository, [template.oceanograph.jsonc](template.oceanograph.jsonc)

```json
{
  "client": {
    "name": "Client Name",
    "platform": "Platform",
    "authors": ["Author 1", "Author 2"],
    "license": "License Type",
    "repository": "https://github.com/...",
    "downloads": {
      "official": "https://...",
      "alternative": "https://..."
    },
    "versions": {
      "latest": "1.0.0",
      "minimum_server": "10.8.0"
    }
  },
  "features": {
    "feature_name": {
      "supported": true,
      "since_version": "0.9.0",
      "notes": "Additional context"
    }
  }
}
```

# ❗ Update (v0.1.3) ❗:

This is no longer maintained, as there is an official package for local filestorage now: [@medusajs/file-local](https://www.npmjs.com/package/@medusajs/file-local).

---

# Local filestorage Medusa plugin

This repo provides the plugin to get you started serving images using your filesystem. Follow the steps below to get ready. Store your images locally on your installation of [Medusa](https://github.com/medusajs/medusa) e-commerce.

## Adding plugin to Medusa.js Core

1. Download the [package](https://www.npmjs.com/package/medusa-plugin-filestorage-local)


```
npm install medusa-plugin-filestorage-local
pnpm install medusa-plugin-filestorage-local
yarn add medusa-plugin-filestorage-local
```

2. Register it in the `medusa-config.js`

### Default configuration

```js
const plugins = [
  ...
  {
    resolve: "medusa-plugin-filestorage-local",
    options: {
      // The baseurl for your medusajs server
      serverBaseUrl: process.env.MEDUSA_BACKEND_URL || "http://localhost:9000",
      // when enabled saves the file as a base64 encoded string inside the database (deleting that row is not yet supported)
      saveInDatabase: false, // recommended: false
      // the folder where your files are stored on the server
      fileLocation: "uploads/persistent/",
    }
  },
  ...
]
```

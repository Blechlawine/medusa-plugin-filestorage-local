# Medusa-plugin-filestorage-local

Store your images locally on your installation of medusa e-commerce.

## Available options (default configuration)

```js
{
    // The baseurl for your medusajs server
    serverBaseUrl: "http://localhost:9000",
    // when enabled saves the file as a base64 encoded string inside the database (deleting that row is not yet supported)
    saveInDatabase: false, // recommended: false
    // the folder where your files are stored on the server
    fileLocation: "uploads/persistent/",
}
```

import { FileService } from "medusa-interfaces";
import fs from "fs";

class FileStorageService extends FileService {
    constructor({}, config) {
        super();
        this.fileLocation = "uploads/persistent/";
        if (!fs.existsSync(this.fileLocation)) {
            fs.mkdirSync(this.fileLocation);
        }
        this.config = {
            serverBaseUrl: "http://localhost:9000",
            saveInDatabase: false,
            ...config,
        };
    }

    // saves the image as a base64 encoded string in the database (in the url column)
    upload(file) {
        console.log(file);
        return new Promise((resolve, reject) => {
            if (this.config.saveInDatabase) {
                let data = fs.readFileSync(file.path, { encoding: "base64" });
                resolve({
                    url: `data:${file.mimetype};base64, ${data.toString("base64")}`,
                });
            } else {
                fs.copyFile(file.path, "uploads/persistent/" + file.filename, (err) => {
                    if (err) throw err;
                    resolve({
                        url: this.config.serverBaseUrl + "/uploads/persistent/" + file.filename,
                    });
                });
            }
        });
    }

    delete(file) {
        // The Promise resolve value is ignored
        console.log(file);
        return Promise.resolve("deleted");
    }
}

export default FileStorageService;

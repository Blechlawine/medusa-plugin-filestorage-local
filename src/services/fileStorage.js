import { FileService } from "medusa-interfaces";
import fs from "fs";

class FileStorageService extends FileService {
	constructor(_, config) {
		super();
		this.config = {
			serverBaseUrl: "http://localhost:9000",
			saveInDatabase: false,
			fileLocation: "uploads/persistent/",
			...config,
		};
		if (!fs.existsSync(this.config.fileLocation)) {
			fs.mkdirSync(this.config.fileLocation);
		}
	}

	upload(file) {
        return new Promise((resolve, reject) => {
            if (this.config.saveInDatabase) {
                // saves the image as a base64 encoded string in the database (in the url column)
				let data = fs.readFileSync(file.path, { encoding: "base64" });
				resolve({
					url: `data:${file.mimetype};base64, ${data.toString("base64")}`,
				});
			} else {
				fs.copyFile(
					file.path,
					this.config.fileLocation + file.filename,
					(err) => {
						if (err) throw err;
						resolve({
							url: `${this.config.serverBaseUrl}/${this.config.fileLocation}${file.filename}`,
						});
					},
				);
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

import { AbstractFileService, type DeleteFileType } from "@medusajs/medusa";
import type {
    FileServiceUploadResult,
    UploadStreamDescriptorType,
    FileServiceGetUploadStreamResult,
    GetUploadedFileType,
} from "@medusajs/medusa/dist/interfaces";
import fs from "fs";
import { EntityManager } from "typeorm";

class FileStorageService extends AbstractFileService {
    protected manager_!: EntityManager;
    protected transactionManager_: EntityManager | undefined;
    uploadProtected(fileData: Express.Multer.File): Promise<FileServiceUploadResult> {
        // TODO: implement this
        throw new Error("Method not implemented.");
    }
    getUploadStreamDescriptor(
        fileData: UploadStreamDescriptorType,
    ): Promise<FileServiceGetUploadStreamResult> {
        // TODO: implement this
        throw new Error("Method not implemented.");
    }
    getDownloadStream(fileData: GetUploadedFileType): Promise<NodeJS.ReadableStream> {
        // TODO: implement this
        throw new Error("Method not implemented.");
    }
    getPresignedDownloadUrl(fileData: GetUploadedFileType): Promise<string> {
        // TODO: implement this
        throw new Error("Method not implemented.");
    }

    private config: TConfig;
    constructor(_: unknown, config: Partial<TConfig>) {
        super({}, config);
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

    async upload(file: Express.Multer.File) {
        if (this.config.saveInDatabase) {
            // saves the image as a base64 encoded string in the database (in the url column)
            let data = await fs.promises.readFile(file.path, { encoding: "base64" });
            return {
                url: `data:${file.mimetype};base64, ${data.toString()}`,
            };
        } else {
            await fs.promises.copyFile(file.path, this.config.fileLocation + file.filename);
            return {
                url: `${this.config.serverBaseUrl}/${this.config.fileLocation}${file.filename}`,
            };
        }
    }

    delete(file: DeleteFileType) {
        console.log(file);
        return Promise.resolve();
    }
}

export default FileStorageService;

import express from "express";
const { Router } = express;

export default (rootDir: string, pluginOptions: TConfig) => {
    const router = Router();

    router.use("/uploads/persistent", express.static(pluginOptions.fileLocation));

    return router;
};

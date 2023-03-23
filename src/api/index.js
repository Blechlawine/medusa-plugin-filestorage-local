import express from "express";
const { Router } = express;

export default () => {
	const router = Router();

	router.use("/uploads/persistent", express.static("uploads/persistent"));

	return router;
};

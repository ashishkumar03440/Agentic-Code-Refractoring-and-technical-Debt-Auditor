import express from "express";
import multer from "multer";
import { uploadRepo } from "../controllers/repoController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("repo"), uploadRepo);

export default router;

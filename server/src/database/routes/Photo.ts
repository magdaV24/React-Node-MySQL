import express from "express";
import { upload_photo } from "../queries/Photos";

const router = express.Router();

router.post('/upload_photo', upload_photo)

export default router
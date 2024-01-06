import express from "express";
import {
  delete_photo,
  fetch_entry_photos,
  fetch_entry_thumbnail,
  upload_photo,
} from "../queries/Photo";

const router = express.Router();

router.post("/upload_photo", upload_photo);
router.get("/fetch_entry_photos/:uuid", fetch_entry_photos);
router.get("/fetch_entry_thumbnail/:uuid", fetch_entry_thumbnail);
router.delete('/delete_photo/:id', delete_photo);

export default router;
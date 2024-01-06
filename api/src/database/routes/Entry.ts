import express from "express";
import {
  create_entry,
  delete_entry,
  edit_entry_fields,
  fetch_entry,
  fetch_if_public,
  fetch_user_entries,
  fetch_user_public_entries,
} from "../queries/Entry";

const router = express.Router();

router.post("/submit", create_entry);
router.get('/fetch_entry/:id', fetch_entry); 
router.delete('/delete/:uuid', delete_entry);
router.post('/edit_fields/:id', edit_entry_fields);
router.get("/entries/:id", fetch_user_entries);
router.get("/public", fetch_if_public);
router.get("/public/:id", fetch_user_public_entries);

export default router;

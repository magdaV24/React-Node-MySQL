import express from "express";
import { register, get_user_by_username, login } from "../queries/User";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/fetch/:username", get_user_by_username);

export default router;

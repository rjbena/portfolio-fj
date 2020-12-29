import express from "express";

import { checkJwt, checkRole } from "../middleware/auth.js";
import { getBlogs } from "../controllers/blogs.js";

const router = express.Router();

router.get("/", getBlogs);

export default router;

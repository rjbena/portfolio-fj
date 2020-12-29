import express from "express";

import { checkJwt, checkRole } from "../middleware/auth.js";
import {
  getBlogs,
  getBlogById,
  getBlogBySlug,
  createBlog,
} from "../controllers/blogs.js";

const router = express.Router();

router.get("/", getBlogs);
router.post("/", createBlog);

router.get("/:id", getBlogById);

router.get("/s/:slug", getBlogBySlug);

export default router;

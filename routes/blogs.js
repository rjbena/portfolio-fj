import express from "express";

import { checkJwt, checkRole } from "../middleware/auth.js";
import {
  getBlogs,
  getBlogById,
  getBlogBySlug,
  createBlog,
  updateBlog,
  getBlogsByUser,
} from "../controllers/blogs.js";

const router = express.Router();

router.get("/", getBlogs);
router.post("/", checkJwt, checkRole("admin"), createBlog);

router.get("/me", getBlogsByUser);

router.get("/:id", getBlogById);
router.patch("/:id", checkJwt, checkRole("admin"), updateBlog);

router.get("/s/:slug", getBlogBySlug);

export default router;

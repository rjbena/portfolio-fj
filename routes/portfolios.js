import express from "express";

import { checkJwt, checkRole } from "../middleware/auth.js";

import {
  getPortfolios,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "../controllers/portfolios.js";

const router = express.Router();

router.get("/", getPortfolios);
router.post("/", checkJwt, createPortfolio);

router.get("/:id", getPortfolioById);
router.patch("/:id", checkJwt, updatePortfolio);
router.delete("/:id", checkJwt, checkRole("admin"), deletePortfolio);
export default router;

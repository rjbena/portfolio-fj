import express from "express";

import { checkJwt } from "../middleware/auth.js";

import {
  getPortfolios,
  getPortfolioById,
  createPortfolio,
} from "../controllers/portfolios.js";

const router = express.Router();

router.get("/", getPortfolios);
router.post("/", checkJwt, createPortfolio);

router.get("/:id", getPortfolioById);
export default router;

import express from "express";

import {
  getPortfolios,
  getPortfolioById,
  createPortfolio,
} from "../controllers/portfolios.js";

const router = express.Router();

router.get("/", getPortfolios);
router.post("/", createPortfolio);

router.get("/:id", getPortfolioById);
export default router;

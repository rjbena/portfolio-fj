import express from "express";

import { getPortfolios, getPortfolioById } from "../controllers/portfolios.js";

const router = express.Router();

router.get("/", getPortfolios);

router.get("/:id", getPortfolioById);
export default router;

import mongoose from "mongoose";

import Portfolio from "../models/portfolio.js";

export const getPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({});
    res.json(portfolios);
  } catch (error) {
    console.log(error);
  }
};

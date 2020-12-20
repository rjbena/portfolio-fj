import mongoose from "mongoose";

import Portfolio from "../models/portfolio.js";

export const getPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({});
    res.json(portfolios);
  } catch (error) {
    return res.status(422).send(error.message);
  }
};

export const getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    res.json(portfolio);
  } catch (error) {
    return res.status(422).send(error.message);
  }
};

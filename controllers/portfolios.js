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

export const createPortfolio = async (req, res) => {
  const portfolioData = req.body;
  const portfolio = new Portfolio(portfolioData);
  const userId = req.user.sub;
  portfolio.userId = userId;
  try {
    const newPortfolio = await portfolio.save();
    res.json(newPortfolio);
  } catch (error) {
    return res.status(422).send(error.message);
  }
};

export const updatePortfolio = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  try {
    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { _id: id },
      body,
      { new: true, runValidators: true }
    );
    res.json(updatedPortfolio);
  } catch (error) {
    return res.status(422).send(error.message);
  }
};

export const deletePortfolio = async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.json("Portfolio successfully deleted");
  } catch (error) {
    return res.status(422).send(error.message);
  }
};

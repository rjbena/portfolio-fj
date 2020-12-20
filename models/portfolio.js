import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 128,
    },
    company: {
      type: String,
      required: true,
      maxlength: 64,
    },
    companyWebsite: {
      type: String,
      maxlength: 128,
    },
    location: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;

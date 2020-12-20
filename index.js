import express from "express";

import dotenv from "dotenv";

import portfoliosRoutes from "./routes/portfolios.js";
import connectDB from "./db/index.js";

dotenv.config();
const app = express();
app.use(express.json());
async function runServer() {
  await connectDB();
  const PORT = process.env.PORT || 3001;
  app.use("/api/v1/portfolios", portfoliosRoutes);
  app.listen(PORT, (error) => {
    if (error) console.error(error);
    console.log(`Server running on port: ${PORT}`);
  });
}

runServer();

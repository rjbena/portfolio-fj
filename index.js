import express from "express";
import path from "path";
import dotenv from "dotenv";

import portfoliosRoutes from "./routes/portfolios.js";
import blogRoutes from "./routes/blogs.js";
import connectDB from "./db/index.js";

const __dirname = path.resolve(path.dirname(""));

dotenv.config();
const app = express();
app.use(express.json());
async function runServer() {
  await connectDB();
  const PORT = process.env.PORT || 3001;
  app.use("/api/v1/portfolios", portfoliosRoutes);
  app.use("/api/v1/blogs", blogRoutes);

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
  });

  app.listen(PORT, (error) => {
    if (error) console.error(error);
    console.log(`Server running on port: ${PORT}`);
  });
}

runServer();

import express from "express";

const app = express();

app.get("/test", (req, res) => {
  return res.json({ message: "test is working!" });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, (error) => {
  if (error) console.error(error);
  console.log(`Server running on port: ${PORT}`);
});

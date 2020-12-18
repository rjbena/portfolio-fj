import fakeDb from "./resources/fakeDb.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  async (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("> Starting populating DB...");
      await fakeDb.populate();
      await mongoose.connection.close();
      console.log("> DB has been populated...");
    }
  }
);

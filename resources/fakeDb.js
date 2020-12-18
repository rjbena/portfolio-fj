import data from "./data.js";
import Portfolio from "../models/portfolio.js";

class FakeDB {
  async clean() {
    await Portfolio.deleteMany({});
  }

  async addData() {
    await Portfolio.create(data.portfolios);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

export default new FakeDB();

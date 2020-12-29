import data from "./data.js";
import Portfolio from "../models/portfolio.js";
import Blog from "../models/blog.js";

class FakeDB {
  async clean() {
    await Portfolio.deleteMany({});
    await Blog.deleteMany({});
  }

  async addData() {
    await Portfolio.create(data.portfolios);
    await Blog.create(data.blogs);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

export default new FakeDB();

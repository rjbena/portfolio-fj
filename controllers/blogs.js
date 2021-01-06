import slugify from "slugify";
import uniqueSlug from "unique-slug";

import { getAccessToken, getAuth0User } from "../middleware/auth.js";
import Blog from "../models/blog.js";

export const getBlogs = async (req, res) => {
  try {
    const authors = {};
    const blogs = await Blog.find({ status: "published" }).sort({
      createdAt: -1,
    });
    const { access_token } = await getAccessToken();
    const blogsWithUser = [];

    for (let blog of blogs) {
      const user =
        authors[blog.userId] || (await getAuth0User(access_token)(blog.userId));
      authors[user.user_id] = user;
      blogsWithUser.push({ blog, user });
    }

    return res.json(blogsWithUser);
  } catch (error) {
    res.status(422).send(error.message);
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    return res.json(blog);
  } catch (error) {
    return res.status(422).send(error.message);
  }
};

export const getBlogsByUser = async (req, res) => {
  try {
    const blogs = await Blog.find({
      status: { $in: ["draft", "published"] },
    }).sort({
      createdAt: -1,
    });
    return res.json(blogs);
  } catch (error) {
    return res.status(422).send(error.message);
  }
};

export const getBlogBySlug = async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  const { access_token } = await getAccessToken();

  const user = await getAuth0User(access_token)(blog.userId);

  return res.json({ blog, user });
};

export const createBlog = async (req, res) => {
  const newBlog = req.body;
  newBlog.userId = req.user.sub;
  const blog = new Blog(newBlog);
  try {
    const createBlog = await blog.save();
    return res.json(createBlog);
  } catch (error) {
    return res.status(422).send(error);
  }
};

const _saveBlog = async (blog) => {
  try {
    const createdBlog = await blog.save();
    return createdBlog;
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.slug) {
      blog.slug += "-" + uniqueSlug();
      return _saveBlog(blog);
    }
    throw error;
  }
};

export const updateBlog = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  Blog.findById(id, async (err, blog) => {
    if (err) {
      return res.status(422).send(err.message);
    }

    if (body.status && body.status === "published" && !body.slug) {
      blog.slug = slugify(blog.title, {
        remove: "-",
        lower: true,
      });
    }

    blog.set(body);
    blog.updateAt = new Date();

    try {
      const updatedBlog = await _saveBlog(blog);
      return res.json(updatedBlog);
    } catch (err) {
      return res.status(422).send(err.message);
    }
  });
};

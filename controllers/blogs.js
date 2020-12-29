import mongoose from "mongoose";

import Blog from "../models/blog.js";

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: "published" }).sort({
      createdAt: -1,
    });
    return res.json(blogs);
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

export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    return res.json(blog);
  } catch (error) {
    return res.status(422).send(error.message);
  }
};

export const createBlog = async (req, res) => {
  const newBlog = req.body;
  newBlog.userId = "google-oauth2|104410789658557438999";
  const blog = new Blog(newBlog);
  try {
    const createBlog = await blog.save();
    return res.json(createBlog);
  } catch (error) {
    return res.status(422).send(error);
  }
};

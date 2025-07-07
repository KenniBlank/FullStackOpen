const Blog = require("../models/blog");
const logger = require("../utils/logger");
const config = require("../utils/config");
const { response } = require("express");

const blogsRouter = require("express").Router();

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
    const newBlog = new Blog(request.body);

    const result = await newBlog.save();
    response.status(201).json(result);
});

module.exports = blogsRouter;

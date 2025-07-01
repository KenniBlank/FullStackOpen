const Blog = require("../models/blog");
const logger = require("../utils/logger");
const config = require("../utils/config");
const { response } = require("express");

const blogsRouter = require("express").Router();

blogsRouter.get("/", (request, response) => {
    Blog.find({})
        .then((data) => response.json(data))
        .catch((err) => logger.error(err));
});

blogsRouter.post("/", (request, response) => {
    const newBlog = new Blog(request.body);

    newBlog.save().then((result) => {
        response.status(201).json(result);
    });
});

module.exports = blogsRouter;

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

blogsRouter.delete("/:id", async (request, response) => {
    const id = request.params.id;
    try {
        const data = await Blog.deleteOne({ _id: id });
        if (data.deletedCount === 1) {
            response.status(204).end();
        } else {
            response.status(404).send({ message: "Resource not found" });
        }
    } catch (err) {
        response.status(422).send({
            message: err.message,
        });
    }
});

module.exports = blogsRouter;

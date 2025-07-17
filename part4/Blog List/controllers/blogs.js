const Blog = require("../models/blog");
const User = require("../models/user");
const blogsRouter = require("express").Router();
const logger = require("../utils/logger");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
    });
    response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
    try {
        const newBlog = new Blog(request.body);
        const savedBlog = await newBlog.save();

        const user = await User.findById(savedBlog.user);
        if (!user) {
            return response.status(400).json({ error: "Invalid user ID" });
        }

        user.blogs = [...user.blogs, savedBlog.id];
        await user.save();

        response.status(201).json(savedBlog);
    } catch (error) {
        next(error);
    }
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

blogsRouter.put("/:id", async (request, response) => {
    try {
        const blog = await Blog.findById(request.params.id);
        if (!blog) {
            return response.status(404).end();
        }

        const { title, author, url, likes } = request.body;

        if (title) blog.title = title;
        if (author) blog.author = author;
        if (url) blog.url = url;
        if (likes !== undefined) blog.likes = likes;

        const updatedBlog = await blog.save();
        response.json(updatedBlog);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

module.exports = blogsRouter;

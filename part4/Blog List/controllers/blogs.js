const Blog = require("../models/blog");
const blogsRouter = require("express").Router();

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
    });
    response.json(blogs);
});

blogsRouter.get("/:id", async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id);
        if (blog) {
            response.json(blog);
        } else {
            response.status(404).send({ error: "Blog not found" });
        }
    } catch (err) {
        next(err);
    }
});

blogsRouter.post("/", async (request, response, next) => {
    try {
        const body = request.body;
        const user = request.user;

        console.log(user);

        if (!user) {
            return response.status(401).json({ error: "Invalid user ID" });
        }

        const newBlog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user.id,
        });

        const savedBlog = await newBlog.save();
        user.blogs = [...user.blogs, savedBlog.id];
        await user.save();

        response.status(201).json(savedBlog);
    } catch (error) {
        next(error);
    }
});

blogsRouter.delete("/:id", async (request, response, next) => {
    const id = request.params.id;

    if (!request.token) {
        return response.status(401).json({ error: "token invalid or expired" });
    }

    const user = request.user;
    if (!user.id) {
        return response.status(401).json({ error: "token missing or invalid" });
    }

    try {
        const blog = await Blog.findById(id);

        if (!blog) {
            return response.status(404).json({ error: "Blog not found" });
        }

        if (blog.user.toString() !== user.id) {
            return response
                .status(403)
                .json({ error: "You are not authorized to delete this blog" });
        }

        await Blog.deleteOne({ _id: id });
        response.status(204).end();
    } catch (err) {
        next(err);
    }
});

blogsRouter.put("/:id", async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id);
        if (!blog) {
            return response.status(404).end();
        }

        const { title, author, url, likes } = request.body;

        if (title) blog.title = title;
        if (author) blog.author = author;
        if (url) blog.url = url;
        if (likes) blog.likes = likes;

        const updatedBlog = await blog.save();
        response.json(updatedBlog);
    } catch (error) {
        next(error);
    }
});

module.exports = blogsRouter;

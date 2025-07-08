const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const helper = require("./api_test_helper");

const API = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
});

test("Blogs are returned as JSON", async () => {
    const response = await API.get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("Verifing that unique identifier property of the blog posts is named id and is correctly assigned", () => {
    const blogsInDB = helper.allBlogsInDB;
    const totalBlogs = blogsInDB.length;
    for (let i = 0; i < totalBlogs; i++) {
        assert.strictEqual(blogFromDB.id, helper.initialBlogs[i]._id);
    }
});

describe("Post request successfull", async () => {
    const beforePost_blogsInDB = await helper.allBlogsInDB();

    const newBlog = {
        title: "Royal Massacre",
        author: "B. Twar",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/31232131/3123213.html",
        likes: 52,
    };

    let result = await API.post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);
    result = result.body;

    const afterPost_blogsInDB = await helper.allBlogsInDB();

    test("After post, DB's total length increases by one", () => {
        assert.strictEqual(
            beforePost_blogsInDB.length + 1,
            afterPost_blogsInDB.length,
        );
    });

    test("Correct Information is stored in DB", () => {
        assert.strictEqual(newBlog.title, result.title);
        assert.strictEqual(newBlog.author, result.author);
        assert.strictEqual(newBlog.url, result.url);
        assert.strictEqual(newBlog.likes, result.likes);
    });

    test("If likes property is missing, it defaults to zero", async () => {
        const likesMissingBlog = {
            title: "Dath's Game",
            author: "B. Twar",
            url: "http://www.someWebSite.com/blogs/123aw2/",
        };

        let result = await API.post("/api/blogs")
            .send(likesMissingBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        assert.strictEqual(result.body.likes, 0);
    });

    test("If title/url is missing, backend sends 400 status code i.e bad request", async () => {
        const blogWithoutTitleNorURL = {
            author: "Somebody",
        };

        let result = await API.post("/api/blogs").send(blogWithoutTitleNorURL);
        assert.strictEqual(result.statusCode, 400);
    });
});

describe("Delete request successfull", () => {
    test("Deleting resource successfull", async () => {
        const blogs = await helper.allBlogsInDB();
        console.log(blogs.length);
        const response = await API.delete(`/api/blogs/${blogs[0].id}`);
        assert.strictEqual(response.statusCode, 204);
    });

    test("Deleting same resource twice result in 404", async () => {
        const blogs = await helper.allBlogsInDB();

        // Redelete same resource
        await API.delete(`/api/blogs/${blogs[0].id}`);
        const response = await API.delete(`/api/blogs/${blogs[0].id}`);

        assert.strictEqual(response.statusCode, 404);
    });

    test("Deleting jibrish resource results in 422 i.e Unprocessable Entry", async () => {
        const jibrishID = "12aASD213AWD";

        const response = await API.delete(`/api/blogs/${jibrishID}`);
        assert.strictEqual(response.statusCode, 422);
    });
});

after(async () => {
    await mongoose.connection.close();
});

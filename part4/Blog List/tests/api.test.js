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

after(async () => {
    await mongoose.connection.close();
});

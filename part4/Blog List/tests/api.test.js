const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const helper = require("./test_helper");

const API = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    Blog.insertMany(helper.initialBlogs);
});

test("Blogs are returned as JSON", async () => {
    const response = await API.get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

after(async () => {
    await mongoose.connection.close();
});

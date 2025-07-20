const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Blog = require("../models/blog");
const User = require("../models/user");

const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const helper = require("./api_test_helper");

const app = require("../app");
const API = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});

    const userPromises = helper.initialUsersToBeCreated.map(async (user) => {
        const passwordHash = await bcrypt.hash(user.password, 11);
        const newUser = new User({
            username: user.username,
            passwordHash,
            name: user.name,
        });
        return newUser.save();
    });

    await Promise.all(userPromises);
});

describe("POST requests", () => {
    test("All initial blogs are posted", async () => {
        const before = await helper.allBlogsInDB();
        for (const blog of helper.initialBlogs) {
            const data = helper.myMap.get(blog.author);

            const userCredentials = {
                username: data.username,
                password: data.password,
            };

            const login = await API.post("/api/login")
                .send(userCredentials)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            const ACCESS_TOKEN = login.body.token;
            const decodedToken = jwt.verify(ACCESS_TOKEN, process.env.SECRET);
            const userId = decodedToken.id;

            const blogToPost = {
                ...blog,
                user: userId,
            };

            await API.post("/api/blogs")
                .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
                .send(blogToPost)
                .expect(201);
        }

        const after = await helper.allBlogsInDB();
        assert.strictEqual(
            after.length,
            before.length + helper.initialBlogs.length,
        );
    });

    test("Wrong ACCESS token return JsonWebTokenError", () => {
        const ACCESS_TOKEN = "random";
        try {
            jwt.verify(ACCESS_TOKEN, process.env.SECRET);
        } catch (err) {
            assert.strictEqual(err.name, "JsonWebTokenError");
        }
    });

    test("Wrong Credential returns 401 AKA unauthorized", async () => {
        const userCredentials = {
            username: "Unkwown",
            password: "Who Asked?",
        };

        const login = await API.post("/api/login").send(userCredentials);
        assert.strictEqual(login.statusCode, 401);
    });

    test("Returns 401 if token not provided", async () => {
        const newBlog = {
            author: helper.initialUsersToBeCreated[0].name,
            title: "Something",
            url: "Soemthing more",
            likes: 10,
        };
        const response = await API.post("/api/blogs").send(newBlog);
        assert.strictEqual(response.statusCode, 401);
    });

    test("Correct credential but lack of title or url returns status code 400", async () => {
        const userCredentials = {
            username: helper.initialUsersToBeCreated[0].username,
            password: helper.initialUsersToBeCreated[0].password,
        };

        const login = await API.post("/api/login")
            .send(userCredentials)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const ACCESS_TOKEN = login.body.token;
        const decodedToken = jwt.verify(ACCESS_TOKEN, process.env.SECRET);
        const userId = decodedToken.id;

        const blogToPost = {
            author: helper.initialUsersToBeCreated[0].name,
            likes: 10,
            user: userId,
        };

        await API.post("/api/blogs")
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
            .send(blogToPost)
            .expect(400);
    });
});

test("Amount of users in db equals amount of initial users", async () => {
    const users = await helper.allUsersInDB();
    assert.strictEqual(users.length, helper.initialUsersToBeCreated.length);
});

test("After initial posts are uploaded, number of blogs in DB length matches initial blog length", async () => {
    const blogs = await helper.allBlogsInDB();
    assert.strictEqual(blogs.length, helper.allBlogsInDB.length);
});

describe("DELETE requests", () => {
    let ACCESS_TOKEN;
    let blogId;
    let userId;

    beforeEach(async () => {
        // Set up a user and a blog for deletion tests
        const userCredentials = {
            username: helper.initialUsersToBeCreated[0].username,
            password: helper.initialUsersToBeCreated[0].password,
        };

        const login = await API.post("/api/login")
            .send(userCredentials)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        ACCESS_TOKEN = login.body.token;
        const decodedToken = jwt.verify(ACCESS_TOKEN, process.env.SECRET);
        userId = decodedToken.id;

        const blogToPost = {
            title: "Test Blog",
            author: helper.initialUsersToBeCreated[0].name,
            url: "http://testblog.com",
            likes: 5,
            user: userId,
        };

        const response = await API.post("/api/blogs")
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
            .send(blogToPost)
            .expect(201);

        blogId = response.body.id;
    });

    test("Successfully deletes a blog with valid token and ID", async () => {
        const before = await helper.allBlogsInDB();

        await API.delete(`/api/blogs/${blogId}`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
            .expect(204);

        const after = await helper.allBlogsInDB();
        assert.strictEqual(after.length, before.length - 1);

        const deletedBlog = await Blog.findById(blogId);
        assert.strictEqual(deletedBlog, null);
    });

    test("Returns 401 when deleting without token", async () => {
        await API.delete(`/api/blogs/${blogId}`).expect(401);

        const blogs = await helper.allBlogsInDB();
        assert.strictEqual(
            blogs.some((blog) => blog.id === blogId),
            true,
        );
    });

    test("Returns 404 when deleting non-existent blog", async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        await API.delete(`/api/blogs/${nonExistentId}`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
            .expect(404);
    });

    test("Returns 403 when user tries to delete another user's blog", async () => {
        const secondUser = {
            username: "testuser2",
            password: "password2",
            name: "Test User 2",
        };

        const passwordHash = await bcrypt.hash(secondUser.password, 11);
        const newUser = new User({
            username: secondUser.username,
            passwordHash,
            name: secondUser.name,
        });
        await newUser.save();

        const login = await API.post("/api/login")
            .send({
                username: secondUser.username,
                password: secondUser.password,
            })
            .expect(200);

        const secondUserToken = login.body.token;

        // Try to delete first user's blog with second user's token
        await API.delete(`/api/blogs/${blogId}`)
            .set("Authorization", `Bearer ${secondUserToken}`)
            .expect(403);

        const blogStillExists = await Blog.findById(blogId);
        assert.strictEqual(blogStillExists !== null, true);
    });
});

after(async () => {
    await mongoose.connection.close();
});

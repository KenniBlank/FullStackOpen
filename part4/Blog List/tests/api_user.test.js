const assert = require("node:assert");
const bcrypt = require("bcrypt");
const { test, describe, beforeEach, after } = require("node:test");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");
const { response } = require("express");

const API = supertest(app);

describe("New User Creation", () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const user = new User({
            username: "root",
            password: "El Psy Congroo",
            name: "Sudo",
        });

        await user.save();
    });

    test("Verify that user at start is correct", async () => {
        const usersAtStart = await User.find({});

        assert.strictEqual(usersAtStart[0].username, "root");
        assert.strictEqual(usersAtStart[0].name, "Sudo");
    });

    test("New User Creation works correctly for valid definition", async () => {
        const newUser = {
            username: "mluukkai",
            name: "Matti Luukkainen",
            password: "salainen",
        };

        const returnedValue = await API.post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const { username, name } = returnedValue.body;
        assert.strictEqual(username, newUser.username);
        assert.strictEqual(name, newUser.name);
    });

    test("Invalid users are not created for username, password less than 3", async () => {
        const response = await API.post("/api/users")
            .send({
                username: "MU",
                password: "GI",
                name: "Mugiwara",
            })
            .expect("Content-Type", /application\/json/);

        assert.strictEqual(response.status, 400);
    });

    test("Invalid users are not created for empty username, password", async () => {
        const response = await API.post("/api/users")
            .send({
                username: "",
                password: "",
                name: "Mugiwara",
            })
            .expect("Content-Type", /application\/json/);

        assert.strictEqual(response.status, 400);
    });
});

after(async () => {
    await mongoose.connection.close();
});

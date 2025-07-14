const assert = require("node:assert");
const bcrypt = require("bcrypt");
const { test, describe, beforeEach } = require("node:test");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");

const API = supertest(app);

describe("New User Creation", () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash("Secret", 11);
        const user = new User({
            username: "root",
            passwordHash: passwordHash,
            name: "Sudo",
        });

        await user.save();
    });

    test("New User Creation", async () => {
        const usersAtStart = await User.find({});

        const newUser = {
            username: "mluukkai",
            name: "Matti Luukkainen",
            password: "salainen",
        };

        await API.post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/);
    });
});

const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.get("/", (request, response, next) => {
    User.find({})
        .then((result) => {
            return response.send(result);
        })
        .catch((err) => {
            return response.status(500).json({ error: "Error getting data" });
            next(err);
        });
});

usersRouter.post("/", async (request, response, next) => {
    const { username, password, name } = request.body;
    if (!(username && password && name)) {
        return response
            .status(400)
            .json({ error: "Username, password and name must be provided" });
    } else if (!(username.length > 2 && password.length > 2)) {
        return response.status(400).json({
            error: "Username and Password must be at least 3 characters long",
        });
    }

    const saltOrRounds = 11;
    const passwordHash = await bcrypt.hash(password, saltOrRounds);

    const newUser = new User({
        username: username,
        passwordHash: passwordHash,
        name: name,
    });

    try {
        const createdUserData = await newUser.save();
        return response.status(201).json(createdUserData);
    } catch (err) {
        next(err);
    }
});

module.exports = usersRouter;

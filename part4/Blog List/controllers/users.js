const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.get("/", (request, response, next) => {
    User.find({})
        .then((result) => {
            response.send(result);
        })
        .catch((err) => {
            response.status(500).json({ error: "Error getting data" });
            next(err);
        });
});

usersRouter.post("/", async (request, response, next) => {
    const { username, password, name } = request.body;
    if (!(username && password && name)) {
        response
            .status(400)
            .send("Username, password and name must be provided");
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
        response.status(201).json(createdUserData);
    } catch (err) {
        next(err);
    }
});

module.exports = usersRouter;

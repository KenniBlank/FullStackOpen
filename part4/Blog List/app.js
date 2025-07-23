const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");

const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs.js");
const usersRouter = require("./controllers/users.js");
const loginRouter = require("./controllers/login.js");

mongoose
    .connect(config.MONGODB_URL)
    .then(() => logger.info("Connected successfully to mongoDB"))
    .catch((err) => logger.error("Error connecting to mongoDB: ", err.message));

const app = express();
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use(
    "/api/blogs",
    middleware.tokenExtractor,
    middleware.userExtractor,
    blogsRouter,
);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

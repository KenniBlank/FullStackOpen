require("dotenv").config();

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const URL = process.env.MONGODB_URL;

console.log("Connecting to: ", URL);
mongoose
    .connect(URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB: ", err.message);
    });

const phoneBookScheme = new mongoose.Schema({
    name: String,
    number: String,
});

phoneBookScheme.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Phonebook", phoneBookScheme);

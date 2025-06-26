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
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    number: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                if (value.length >= 8) {
                    const arr = value.split("-");
                    if (arr.length === 2) {
                        const firstPartLength = arr[0].length;
                        if (firstPartLength === 2 || firstPartLength === 3) {
                            return true;
                        }
                    }
                }

                return false;
            },

            message:
                'Username must be 8 char or longer and must contain \"-\" that separates numbers',
        },
    },
});

phoneBookScheme.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Phonebook", phoneBookScheme);

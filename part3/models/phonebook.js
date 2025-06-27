require("dotenv").config();

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const URL = process.env.MONGODB_URL;

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
                if (value.length < 8) {
                    this.message =
                        "Phonenumber must be at least 8 characters long.";
                    return false;
                }

                const arr = value.split("-");
                if (arr.length !== 2) {
                    this.message =
                        "Phonenumber must contain exactly one \"-\" character.";
                    return false;
                }

                const { firstPart, secondPart } = arr;
                if (isNaN(firstPart) || isNaN(secondPart)) {
                    this.message = "Phoennumber must be a numeric";
                    return false;
                }
                const firstPartLength = arr[0].length;
                if (firstPartLength !== 2 || firstPartLength !== 3) {
                    this.message =
                        "The part before \"-\" must have 2 or 3 numbers";
                    return false;
                }

                return true;
            },
            message: "Phonenumber Invalid",
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

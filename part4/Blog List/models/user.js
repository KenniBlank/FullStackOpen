const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        unique: true,
    },

    name: String,
    passwordHash: String,

    blogs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
    },
});

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;

        delete returnedObject.passwordHash;
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("users", userSchema);

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Phonebook = require("./models/phonebook");

const app = express();

// Morgan custom token
morgan.token("POST-data", (request) => {
    if (request.method == "POST") {
        return `${JSON.stringify(request.body)}`;
    } else {
        return " ";
    }
});

// Middleware
app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :POST-data ",
    ),
);
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

app.get("/api/persons", (request, response) => {
    Phonebook.find({}).then((result) => {
        return response.json(result).end();
    });
});

app.get("/info", (request, response) => {
    Phonebook.find({}).then((result) => {
        const currentData = new Date();
        let responseData = `<p>Phonebook has info for ${result.length} people</p>`;
        responseData += `${currentData.toString()}`;
        return response.send(responseData);
    });
});

app.get("/api/persons/:id", (request, response) => {
    Phonebook.findById(String(request.params.id))
        .then((personDetail) => {
            return response.json(personDetail);
        })
        .catch((err) => {
            console.log(err);
            return response.status(404).json({ error: "Person not found" });
        });
});

app.delete("/api/persons/:id", (request, response, next) => {
    Phonebook.findByIdAndDelete(request.params.id)
        .then((result) => {
            if (result) {
                response.status(204).end();
            } else {
                response.status(404).send({ error: "Person not found" });
            }
        })
        .catch((error) => next(error)); // Pass to error handler middleware
});

// Add new person to phonebook
app.post("/api/persons", (request, response) => {
    const reqData = request.body;
    if (!reqData.name || !reqData.number) {
        return response
            .status(400)
            .json({ error: "Both name and number fields required" });
    }

    const newPerson = new Phonebook({
        name: reqData.name,
        number: reqData.number,
    });

    newPerson
        .save()
        .then((savedPerson) => {
            console.log(savedPerson);
            return response.status(201).json(newPerson);
        })
        .catch((err) => {
            console.log("Failed to add: ", err);
            return response
                .status(400)
                .json({ error: "Error adding newData to phoenbook" });
        });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

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
    Phonebook.findById(request.params.id)
        .then((personDetail) => {
            if (personDetail) {
                return response.json(personDetail);
            } else {
                return response.status(404).json({ error: "Person not found" });
            }
        })
        .catch((err) => {
            response.status(400).send({ error: "malformatted id" });
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
app.post("/api/persons", (request, response, next) => {
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

    Phonebook.create({
        name: reqData.name,
        number: reqData.number,
    })
        .then((createdPerson) => {
            createdPerson
                .save()
                .then((savedPerson) => {
                    console.log(savedPerson);
                    return response.status(201).json(newPerson);
                })
                .catch((error) => {
                    next(error);
                });
        })
        .catch((error) => {
            next(error);
        });
});

app.put("/api/persons/:id", (request, response, next) => {
    const { name, number } = request.body;

    Phonebook.findById(request.params.id)
        .then((person) => {
            if (!person) {
                return response.status(404).end();
            }

            person.name = name;
            person.number = number;

            return person.save().then((updatedPersonEntry) => {
                response.json(updatedPersonEntry);
            });
        })
        .catch((error) => next(error));
});

const unknowEndPoint = (request, response) => {
    response.status(404).send({ error: "Unknown Endpoint" });
};
app.use(unknowEndPoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const errorHandler = (error, request, response, next) => {
    switch (error.name) {
        case "CastError":
            return response.status(400).send({ error: "malformatted ID" });
        case "ValidationError":
            return response.status(400).json({ error: error.message });
        default:
            return response.status(500).json({ error: error.message });
    }
};

app.use(errorHandler);

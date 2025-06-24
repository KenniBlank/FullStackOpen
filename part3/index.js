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
    return response.json(persons).end();
});

app.get("/info", (request, response) => {
    const currentData = new Date();
    let responseData = `<p>Phonebook has info for ${persons.length} people</p>`;
    responseData += `${currentData.toString()}`;
    return response.send(responseData);
});

app.get("/api/persons/:id", (request, response) => {
    const person = persons.find((person) => person.id === request.params.id);
    if (!person)
        return response.status(404).json({ error: "Person not found" });
    return response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
    persons = persons.filter((person) => person.id !== request.params.id);
    return response.status(204).end();
});

app.post("/api/persons", (request, response) => {
    const newId = () => {
        return String(Math.floor(Math.random() * 1e15)); // Bad but requirement for the course exercise
    };

    const reqData = request.body;
    if (!reqData.name || !reqData.number) {
        return response
            .status(400)
            .json({ error: "Both name and number fields required" });
    }

    if (persons.some((person) => person.name == reqData.name)) {
        return response.status(409).json({ error: "Name must be unique" });
    }

    const newPerson = {
        id: newId(),
        name: reqData.name,
        number: reqData.number,
    };

    persons.push(newPerson);
    return response.status(201).json(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

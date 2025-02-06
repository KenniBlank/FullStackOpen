const express = require("express")
const morgan = require("morgan")

const app = express();

app.use(express.json());

morgan.token('req_data', function (req, res) { return JSON.stringify(req.body)})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req_data'));

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
        "id": "2",
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const PORT = 3001
app.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}`)
})

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/info", (request, response) => {
    const currentTime = new Date();
    let length = persons.length;
    response.send(`<div>Phonebook has info for ${length} people</div><div>${currentTime}</div`)
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id;
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id

    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    const body = request.body;

    // Check if name is provided
    if (!body.name) {
        return response.status(400).json({ error: "no name was provided" });
    }

    // Check if number is provided
    if (!body.number) {
        return response.status(400).json({ error: "no number was provided" });
    }

    // Check for unique name
    const uniquePerson = persons.find(person => person.name === body.name);
    if (uniquePerson) {
        return response.status(400).json({ error: "name must be unique" });
    }
    
    const newPerson = {
        id: String(Math.ceil(Math.random() * 100000)),
        name: body.name,
        number: body.number,
    };

    persons = persons.concat(newPerson);
    response.status(201).json(newPerson);
})
const express = require("express")
const App = express();
App.use(express.json())

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
App.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}`)
})

App.get("/api/persons", (request, response) => {
    response.json(persons)
})

App.get("/info", (request, response) => {
    const currentTime = new Date();
    let length = persons.length;
    response.send(`<div>Phonebook has info for ${length} people</div><div>${currentTime}</div`)
})

App.get("/api/persons/:id", (request, response) => {
    const id = request.params.id;
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

App.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id

    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

App.post("/api/persons", (request, response) => {
    const body = request.body
    const newId = String((Math.ceil(Math.random() * 100000)))

    const newPerson = {
        id: newId,
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(newPerson)

    response.json(newPerson)
})
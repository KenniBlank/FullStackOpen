import { useState } from 'react'

const DisplayPersonDetails = ({persons, filter}) => {
  filter = filter.toLowerCase()

  const filtered = persons.filter((personDetail) => {
    return (personDetail.name.toLowerCase()).includes(filter)
  })

  console.log(filtered);

  return (
    <>
      {
        filtered.map((personDetail) => {
          return <div key={personDetail.id}>{personDetail.name} {personDetail.number}</div>
        })
      }
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilterValue] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons[persons.length - 1].id + 1
    }
    const result = persons.filter(
      (person) => 
        JSON.stringify({name: person.name, number: person.number}) === JSON.stringify({name: newPerson.name, number: newPerson.number})
    )

    if (result.length > 0) {
      alert (`${newName} is already added to phonebook`)
    } else if (result.length == 0) {
      setPersons([...persons, newPerson])
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with: <input value={newFilter} onChange={e => setFilterValue(e.target.value)}/>
      </div>

      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
        </div>

        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)}/>
        </div>

        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <DisplayPersonDetails persons={persons} filter={newFilter}/>
    </div>
  )
}

export default App
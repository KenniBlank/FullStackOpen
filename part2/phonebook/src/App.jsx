import { useState } from 'react'

const Persons = ({persons, filter}) => {
  filter = filter.toLowerCase()

  const filtered = persons.filter((personDetail) => {
    return (personDetail.name.toLowerCase()).includes(filter)
  })

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

const Filter = ({value, change}) => {
  return (
    <>
      filter shown with: <input value={value} onChange={change}/>
    </>
  )
}

const PersonForm = (props) => {
  return (
    <form>
      <div>
        name: <input value={props.newName} onChange={props.newNameChange}/>
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.newNumberChange}/>
      </div>
      <div>
          <button type="submit" onClick={props.addPerson}>add</button>
        </div>
    </form>
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

      <Filter change={e => setFilterValue(e.target.value)} value={newFilter}/>

      <h2>add a new</h2>

      <PersonForm 
        newName={newName} newNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber} newNumberChange={e => setNewNumber(e.target.value)}
        addPerson={addPerson}
      />
      
      <h2>Numbers</h2>

      <Persons persons={persons} filter={newFilter}/>
    </div>
  )
}

export default App
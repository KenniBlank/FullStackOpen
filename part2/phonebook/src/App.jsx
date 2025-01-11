import { useState } from 'react'

const DisplayPersonDetails = ({persons}) => {
  return (
    <div>
    {
      persons.map((personDetail) => <div key={personDetail.name}>{personDetail.name}</div>)
    }
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName
    }
    const result = persons.filter((person) => JSON.stringify(person) === JSON.stringify(newPerson))

    if (result.length > 0) {
      alert (`${newName} is already added to phonebook`)
    } else if (result.length == 0) {
      setPersons([...persons, newPerson])
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
        </div>

        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <DisplayPersonDetails persons={persons}/>
    </div>
  )
}

export default App
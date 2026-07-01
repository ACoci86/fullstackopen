import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', id: '1', number: '0835698745'}]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState ('')
  const [filter, setFilter] = useState ('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

    const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()          // stop the page from reloading

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    if (!/^[0-9\s-]+$/.test(newNumber)) {
      alert(`Please enter a valid phone number (digits, spaces or dashes only)`)
      return
    }


    const person = {            // build the new person
      name: newName,
      id: String(persons.length + 1),
      number: newNumber
    }

    setPersons(persons.concat(person)) // add it to the list (new array)
    setNewName('')                     // clear the input box
    setNewNumber('')
  }

  const personToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>Name to search: <input value={filter} onChange={handleFilterChange} />
</div>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personToShow.map(person =>
        <p key={person.id}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App
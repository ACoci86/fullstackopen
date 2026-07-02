import { useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState ('')
  const [filter, setFilter] = useState ('')

  useEffect(() => {
    axios
      .get('http://localhost:3000/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


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

    const existing = persons.find(person => person.name === newName)
    if (existing) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...existing, number: newNumber }
        axios
          .put(`http://localhost:3000/persons/${existing.id}`, changedPerson)
          .then(response => {
            setPersons(persons.map(person =>
              person.id !== existing.id ? person : response.data
            ))
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }


    if (!/^[0-9\s-]+$/.test(newNumber)) {
      alert(`Please enter a valid phone number (digits, spaces or dashes only)`)
      return
    }


    const person = {            // build the new person
      name: newName,
      number: newNumber
    }

    axios
      .post('http://localhost:3000/persons', person)
      .then(response => {
        setPersons(persons.concat(response.data))
      })
    setNewName('')                     // clear the input box
    setNewNumber('')
  }

  const personToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const deleteName = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      axios
        .delete(`http://localhost:3000/persons/${id}`)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  



  return (
    <div className="app">
      <h1>Phonebook</h1>

      <div className="field">
        <label>search</label>
        <input value={filter} onChange={handleFilterChange} placeholder="filter by name" />
      </div>

      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div className="field">
          <label>name</label>
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div className="field">
          <label>number</label>
          <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <button type="submit">add</button>
      </form>

      <h2>Numbers</h2>
      {personToShow.length === 0
        ? <p className="empty">No matches</p>
        : <ul className="people">
            {personToShow.map(person =>
              <li key={person.id}>
                <span>{person.name}</span>
                <span className="number">{person.number}</span>
                <span><button>Edit</button></span>
<button onClick={() => deleteName(person.id, person.name)}>Delete</button>

              </li>
            )}
          </ul>
      }
    </div>
  )
}

export default App
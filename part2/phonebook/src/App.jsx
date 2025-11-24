import { useState } from 'react'
import { useEffect } from 'react'
import phoneService from './services/phones'

const Person = ({ name, number }) => <>{name} {number}</>

const DeletePerson = ({ onClick }) => {
  return <button onClick={onClick}>delete</button>
}

const Persons = ({ persons, filter, onClickDelete }) => {
return (
  <div>
    {persons
      .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
      .map(person => (
        <div key={person.id}>
          <Person name={person.name} number={person.number} />
          <DeletePerson onClick={() => onClickDelete(person.id)} />
        </div>
      ))}
  </div>
)
}

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={(e) => {setFilter(e.target.value)}} />
    </div>
  )
}

const PersonForm = ({ onSubmit, newName, setNewName, newNumber, setNewNumber }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={(e) => {setNewName(e.target.value)}} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(e) => {setNewNumber(e.target.value)}} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    phoneService
      .getAll()
      .then(response => setPersons(response))
  }, [])

  const handleAddPerson = event => {
    event.preventDefault()
    const existedPerson = persons.find((person) => person.name === newName)
    if (existedPerson) {
      const updatedPerson = {...existedPerson, number: newNumber}
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        phoneService
        .update(updatedPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id === updatedPerson.id ? returnedPerson : person))
          setNewName('')
          setNewNumber('')
        })
      }
    } else if (persons.find((person) => person.number === newNumber)) {
      alert(`A person with number ${newNumber} is already added to phonebook`)
    } else {
      const newPerson = {name: newName, number: newNumber}

      phoneService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleDeletePerson = id => {
    const personToDelete = persons.find(person => person.id === id)
    if (!personToDelete) {
      alert("This person is no longer in the phonebook")
      return
    }
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      phoneService.deletePerson(id)
      .then(() => setPersons(persons.filter(person => person.id !== id)))
      .catch(() => {
        alert(`${personToDelete.name} was already removed from the server`)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} setFilter={setFilter}/>

      <h2>Add a new</h2>

      <PersonForm 
        onSubmit={handleAddPerson} newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} filter={filter} onClickDelete={handleDeletePerson}/>
    </div>
  )
}

export default App
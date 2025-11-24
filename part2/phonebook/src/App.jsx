import { useState } from 'react'
import { useEffect } from 'react'
import phoneService from './services/phones'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import SuccessMessage from './components/SuccessMessage'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

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
          setSuccessMessage(`The number of ${returnedPerson.name} is updated`)
          setTimeout(() => setSuccessMessage(null), 5000)
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
          setSuccessMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => setSuccessMessage(null), 5000)
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
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setSuccessMessage(`${personToDelete.name} was deleted from the phonebook`)
        setTimeout(() => setSuccessMessage(null), 5000)
      })
      .catch(() => {
        alert(`${personToDelete.name} was already removed from the server`)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <SuccessMessage message={successMessage} />

      <Filter filter={filter} setFilter={setFilter} />

      <h2>Add a new</h2>

      <PersonForm 
        onSubmit={handleAddPerson} newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} filter={filter} onClickDelete={handleDeletePerson} />
    </div>
  )
}

export default App
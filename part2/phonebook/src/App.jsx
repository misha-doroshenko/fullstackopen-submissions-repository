import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Person = ({name, number}) => <p>{name} {number}</p>

const Persons = ({persons, filter}) => {
  const makeComponents = (person) => <Person key={person.id} name={person.name} number={person.number} />
  const filterPersons = (person) => person.name.toLowerCase().includes(filter.toLowerCase())
  const person_components = filter ? persons.filter(filterPersons).map(makeComponents) : persons.map(makeComponents)

  return <div>{person_components}</div>
}

const Filter = ({filter, setFilter}) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={(e) => {setFilter(e.target.value)}} />
    </div>
  )
}

const PersonForm = ({onSubmit, newName, setNewName, newNumber, setNewNumber}) => {
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
    const eventHandler = response => setPersons(response.data)
    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)
  }, [])

  const handleAddPerson = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else if (persons.find((person) => person.number === newNumber)) {
      alert(`A person with number ${newNumber} is already added to phonebook`)
    } else {
      const newPerson = {name: newName, number: newNumber}
      const eventHandler = response => {
        console.log(response)
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      }

      const promise = axios.post('http://localhost:3001/persons', newPerson)
      promise.then(eventHandler)
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

      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
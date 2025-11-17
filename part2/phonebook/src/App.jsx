import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleAddPerson = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else if (persons.find((person) => person.number === newNumber)) {
      alert(`A person with number ${newNumber} is already added to phonebook`)
    } else {
      const newPerson = {name: newName, number: newNumber, id: persons.length + 1}
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
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
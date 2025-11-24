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

export default Persons
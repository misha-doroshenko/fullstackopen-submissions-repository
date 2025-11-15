const Header = ({text}) => <h2>{text}</h2>

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part) => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Total = ({total}) => <p><b>total of {total} exercises</b></p>

const Course = ({course}) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts.reduce((sum, part) => sum += part.exercises, 0)} />
    </div>
  )
}

export default Course
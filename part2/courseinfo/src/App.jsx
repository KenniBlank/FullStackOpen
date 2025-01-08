const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => { 
   return (    
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({ parts }) => {
  let index = 0
  return (
    <>
      {parts.map(part => <Part key={index++} part={part}/>)}
    </>
  )
}

const Sum = ({ parts }) => {
  let totalExercise = parts.reduce((sum, part) => {
    return sum += part.exercises
  }, 0)

  return (
    <b>
      total of {totalExercise} exercises
    </b>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    },
    {
      name: "Redux",
      exercises: 11
    }
  ]
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Sum parts={parts} />
    </div>
  )
}

export default App
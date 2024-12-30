const Header = (parameters) => {
  return (
    <h1>{parameters.course}</h1>
  )
}

const Part = (parameters) => {
  return (
    <p>{parameters.name} {parameters.exercise}</p>
  )
}

const Content = (parameters) => {
  return (
    <>
      <Part name={parameters.part} exercise={parameters.exercise}/>
    </>
  )
}

const Total = (parameters) => {
  return (
    <p>Number of exercises {parameters.sum}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content part={part1.name} exercise={part1.exercises}/>
      <Content part={part2.name} exercise={part2.exercises}/>
      <Content part={part3.name} exercise={part3.exercises}/>

      <Total sum={part1['exercises'] + part2['exercises'] + part3['exercises']}/>
    </div>
  )
}

export default App
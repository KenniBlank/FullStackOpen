const Header = (parameters) => {
  return (
    <h1>{parameters.course}</h1>
  )
}

const Part = (parameters) => {
  return (
    <p>{parameters.part} {parameters.exercise}</p>
  )
}

const Content = (parameters) => {
  let parts = parameters.part.split(' | ');
  let exercises = parameters.exercise.split(' | ');

  return (
    <>
      {parts.map((part, index) => (
        <Part part={part} exercise={exercises[index]}/>
      ))}
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content part={part1 + ' | ' + part2 + ' | ' + part3} exercise={exercises1 + ' | ' + exercises2 + ' | ' + exercises3}/>

      <Total sum={exercises1+exercises2+exercises3}/>
    </div>
  )
}

export default App
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
  console.log(parameters.part);
  return (
    <>
      <Part name={parameters.part[0]['name']} exercise={parameters.part[0]['exercises']} />
      <Part name={parameters.part[1]['name']} exercise={parameters.part[1]['exercises']} />
      <Part name={parameters.part[2]['name']} exercise={parameters.part[2]['exercises']} />
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
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content part={parts}/>

      <Total sum={parts[0]['exercises'] + parts[1]['exercises'] + parts[2]['exercises']}/>
    </div>
  )
}

export default App
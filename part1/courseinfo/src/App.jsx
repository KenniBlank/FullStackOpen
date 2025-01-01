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
    <p>Number of exercises {parameters.parts[0]['exercises'] + parameters.parts[1]['exercises'] + parameters.parts[2]['exercises']}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header course={course['name']}/>
      <Content part={course['parts']}/>
      <Total parts={course['parts']}/>
    </div>
  )
}

export default App
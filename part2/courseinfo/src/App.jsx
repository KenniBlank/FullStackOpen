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
      <Header course={course} />
      <Content parts={parts} />
    </div>
  )
}

export default App
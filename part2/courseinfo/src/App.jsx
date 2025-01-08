const Header = ({ course, headerSize }) => {
  if (headerSize === 1) {
    return (
      <h1>{course}</h1>
    )
  } else if (headerSize === 2) {
    return (
      <h2>{course}</h2>
    )
  }
}

const Part = ({ part }) => { 
   return (    
    <p>{part.name} {part.exercises}</p>
  )
}

const TotalExercise = ((parts) => {
  let totalExercise = parts.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <b>
      total of {totalExercise} exercises
    </b>
  )
})

const Course = ({course}) => {
  return (
    <>
      <Header course={course.name} headerSize={2} key={course.id}/>
      {
        course.parts.map((part) => {
          return <Part part={part} key={part.id}/>
        })
      }

      <TotalExercise parts={course.parts} />
    </>
  )
}

const Content = ({ courses }) => {
  return (
    <>
      {
        courses.map((course) => {
          return <Course course={course} key={course.id}/>
        })
      }
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      <Header course={"Web development curriculum"} headerSize={1}/>
      <Content courses={courses}/>
    </div>
  )
}

export default App
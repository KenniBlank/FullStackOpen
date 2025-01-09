export const Header = ({ course, headerSize }) => {
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

export default Content
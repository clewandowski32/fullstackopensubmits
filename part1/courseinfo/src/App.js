const Header = (headerprops) =>{
  return(
    <h1>{headerprops.course}</h1>
  )

}

const Content = (contentprops) => {
  return(
    <div>
      <Part part={contentprops.parts[0]} />
      <Part part={contentprops.parts[1]} />
      <Part part={contentprops.parts[2]} />
    </div>
    
  )
  
}

const Part = (partprops) => {
  return(
    <p>
      {partprops.part.part_name} {partprops.part.exercises}
    </p>
  )
}

const Total = (totalprops) => {
  return(
    <p>
      Number of exercises {totalprops.parts[0].exercises +
                           totalprops.parts[1].exercises +
                           totalprops.parts[2].exercises}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {part_name: 'Fundamentals of React', exercises: 10},
      {part_name: 'Using props to pass data', exercises: 7},
      {part_name: 'State of a component', exercises: 14},
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App;

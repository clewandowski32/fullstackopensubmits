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
      Number of exercises {totalprops.total}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {part_name: 'Fundamentals of React', exercises: 10},
    {part_name: 'Using props to pass data', exercises: 7},
    {part_name: 'State of a component', exercises: 14},
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={parts[0].exercises + parts[1].exercises + 
                    parts[2].exercises} />
    </div>
  )
}

export default App;

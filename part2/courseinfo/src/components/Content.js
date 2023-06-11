import Part from './Part'


const Content = ({name, parts}) => {
    const total = parts.reduce(
        (accumulator, currentValue) => 
         accumulator + currentValue.exercises,
        0)
    return(
        <div>
            
            {parts.map(part => 
                <Part key={part.id} name ={part.name} exercise={part.exercises}
                      />)}
            <b>total of {total} exercises</b>
        </div>
    )
}

export default Content
import Content from './Content'
import Header from './Header'

const Course = ({courses}) => {

    return(
        <div>
            {courses.map(course => {
                return(
                    <div key={course.id}>
                        <Header text={course.name}/>
                        <Content name={course.name}
                         parts={course.parts}/>
                    </div>
                )
                }
            )}
            
        </div>
    )
}

export default Course
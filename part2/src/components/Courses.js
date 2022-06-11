const Part = (props) => {
    return (
        <div>
            <p>
                {props.name} {props.countEx}
            </p>
        </div>
    )
}

const Total = ({parts}) => {
    return (
        <div>
            <p>Number of exercises {parts.map(part => part.exercises).reduce((a, b) => a + b, 0)}</p>
        </div>
    )
}


const Content = ({parts}) => {
    return (
        <div>
            {
                parts.map(p =>
                    <Part key={p.id} name={p.name} countEx={p.exercises}/>
                )
            }
        </div>
    )
}

const Courses = ({courses}) => {
    return (
        <div>
            {
                courses.map(course => <div key={course.id}>
                    <h1>{course.name}</h1>
                    <Content parts={course.parts}/>
                    <Total parts={course.parts}/>
                </div>)
            }
        </div>
    )
}

export default Courses
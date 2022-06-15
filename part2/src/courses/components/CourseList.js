const Header = ({course}) => <h2>{course.name}</h2>

const Total = ({parts}) => <p>total of {parts.map(part => part.exercises).reduce((a, b) => a + b, 0)} exercises</p>

const Part = ({part}) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({parts}) =>
    <div>
        {
            parts.map(part => <Part key={part.id} part={part}/>)
        }
    </div>

const Course = ({course}) => {
    return (
        <div>
            <Header course={course}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

const CourseList = ({courses}) => {
    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map(course => <Course key={course.id} course={course}/>)}
        </div>
    )
}

export default CourseList;
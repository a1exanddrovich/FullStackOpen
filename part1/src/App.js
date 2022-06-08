const Header = (props) => {
    return (
        <div>
            <h1>{props.courseName}</h1>
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>Number of exercises {props.totalCount}</p>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                {props.name} {props.countEx}
            </p>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part name={props.firstPart} countEx={props.countExFirst}/>
            <Part name={props.secondPart} countEx={props.countExSecond}/>
            <Part name={props.thirdPart} countEx={props.countExThird}/>
        </div>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header courseName={course}/>
            <Content firstPart={part1}
                     countExFirst={exercises1}
                     secondPart={part2}
                     countExSecond={exercises2}
                     thirdPart={part3}
                     countExThird={exercises3}/>
            <Total totalCount={exercises1 + exercises2 + exercises3}/>
        </div>
    )
}

export default App
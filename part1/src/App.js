const Hello = ({name, age}) => {
    const bornYear = () => new Date().getFullYear() - age;

    return (
        <div>
            <p>
                Hello, {name}! You're {age} years old. So you probably was born in {bornYear()}
            </p>
        </div>
    )
}

const App = () => {
    const props = {
        name: 'Peter',
        age: 135
    }

    return (
        <div>
            <h1>Greetings</h1>
            <Hello props={props}/>
        </div>
    )
}

export default App
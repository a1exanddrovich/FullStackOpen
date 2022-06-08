import {useState} from "react";

const Display = ({counter}) => <div>{counter}</div>

const Button = ({action, text}) => (
    <div>
        <button onClick={action}>
            {text}
        </button>
    </div>
)


const App = () => {
    const [counter, setCounter] = useState(0)

    const increment = () => {
        setCounter(counter + 1)
        console.log("Clicked + 1")
    }

    const decrement = () => {
        setCounter(counter - 1)
        console.log("Clicked - 1")
    }

    const makeZero = () => {
        setCounter(0)
        console.log("Clicked - 0")
    }

    return (
        <div>
            <Display counter={counter}/>
            <Button action={increment}
                    text={"Add one"}/>
            <Button action={decrement}
                    text={"Minus one"}/>
            <Button action={makeZero}
                    text={"Reset"}/>
        </div>
    )
}

export default App;
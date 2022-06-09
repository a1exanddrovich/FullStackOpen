import {useState} from "react";

const History = (props) => {
    if (props.all.length === 0) {
        return (
            <div>
                The button is used to change the state
            </div>
        )
    }

    return (
        <div>
            The history is {props.all.join(" ")}
        </div>
    )
}

const Button = (props) => {
    return (
        <button onClick={props.handler}>
            {props.text}
        </button>
    )
}

const App = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [all, setAll] = useState([])

    const handleLeftClick = () => {
        setAll(all.concat("L"))
        setLeft(left + 1)
    }

    const handleRightClick = () => {
        setAll(all.concat("R"))
        setRight(right + 1)
    }

    return (
        <div>
            {left}
            <Button handler={handleLeftClick}
                    text={"Left"}/>
            {right}
            <Button handler={handleRightClick}
                    text={"Right"}/>
            <History all={all}/>
        </div>
    )
}

export default App;
import {useState} from "react";

const Button = (props) => {
    return (
        <button onClick={props.handler}>
            {props.text}
        </button>
    )
}

const Statistics = (props) => {
    return (
        <div>
            <table>
                <StatisticLine text={"Good"}
                               value={props.goodValue}/>

                <StatisticLine text={"Neutral"}
                               value={props.neutralValue}/>

                <StatisticLine text={"Bad"}
                               value={props.badValue}/>

                <StatisticLine text={"All"}
                               value={props.allValue}/>

                <StatisticLine text={"Score"}
                               value={props.averageValue}/>

                <StatisticLine text={"Positive"}
                               value={props.positiveValue}/>
            </table>
        </div>
    )
}

const StatisticLine = (props) => {
    if (props.text === "Positive") {
        return (
            <tr>
                <td>{props.text}</td>
                <td>{props.value} %</td>
            </tr>
        )
    }
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)
    const [score, setScore] = useState(0.0)
    const [positive, setPositive] = useState(0.0)

    const handleGoodFeedback = () => {
        const newAll = all + 1
        const newGood = good + 1
        setAll(all + 1)
        setGood(good + 1)
        setScore((newGood - bad) / newAll)
        setPositive((newGood / newAll) * 100)
    }

    const handleNeutralFeedback = () => {
        const newAll = all + 1
        const newNeutral = neutral + 1
        setAll(newAll)
        setNeutral(newNeutral)
        setScore(score / newAll)
        setPositive((good / newAll) * 100)
    }

    const handleBadFeedback = () => {
        const newAll = all + 1
        const newBad = bad + 1
        setAll(newAll)
        setBad(newBad)
        setScore((good - newBad) / newAll)
        setPositive((good / newAll) * 100)
    }

    if (all !== 0) {
        return (
            <div>
                <b>Give feedback</b>
                <br/>
                <Button handler={handleGoodFeedback}
                        text={"Good"}/>
                <Button handler={handleNeutralFeedback}
                        text={"Neutral"}/>
                <Button handler={handleBadFeedback}
                        text={"Bad"}/>
                <br/>
                <b>Statistics</b>
                <Statistics goodValue={good}
                            badValue={bad}
                            neutralValue={neutral}
                            allValue={all}
                            averageValue={score}
                            positiveValue={positive}/>
            </div>
        )
    }

    return (
        <div>
            <b>Give feedback</b>
            <br/>
            <Button handler={handleGoodFeedback}
                    text={"Good"}/>
            <Button handler={handleNeutralFeedback}
                    text={"Neutral"}/>
            <Button handler={handleBadFeedback}
                    text={"Bad"}/>
            <br/>
            <b>Statistics</b>
            <p>No feedback given</p>
        </div>
    )

}

export default App;
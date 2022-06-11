import {useState} from "react";

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]

    const points = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0
    }

    const [selected, setSelected] = useState(0)
    const [point, setPoint] = useState(points)
    const [popular, setPopular] = useState(0)

    const computeTheMostPopular = () => {
        let mostPopular = 0

        for (let i = 0; i <= 6; i++) {
            mostPopular = point[i] > point[mostPopular] ? i : mostPopular
        }

        return mostPopular
    }

    const nextAnecdote = () => {
        setSelected(Math.floor(Math.random() * anecdotes.length))
    }

    const voteForAnecdote = () => {
        const copy = {...point}
        copy[selected] = copy[selected] + 1
        setPoint(copy)
        setPopular(computeTheMostPopular)
    }

    return (
        <div>
            <h1>Anecdote od the day</h1>
            {anecdotes[selected]}
            <br/>
            <p>Has {point[selected]} votes</p>
            <button onClick={voteForAnecdote}>
                Vote
            </button>
            <button onClick={nextAnecdote}>
                Next anecdote
            </button>
            <h1>The most popular anecdote</h1>
                {anecdotes[popular]}
            <br/>
        </div>
    )
}

export default App;
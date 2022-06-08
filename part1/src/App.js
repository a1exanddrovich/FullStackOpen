import React from "react"

const App = () => {
    const now = new Date()
    const a = 2
    const b = 3
    return React.createElement(
        "div",
        null,
        React.createElement(
            "p",
            null,
            "Today is",
            now.toDateString()
        ),
        React.createElement(
            "p",
            null,
            a,
            " plus ",
            b,
            " is ",
            a + b
        )
    )
}

export default App
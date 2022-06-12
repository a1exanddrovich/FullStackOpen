import Note from "./components/Note";
import {useState} from "react";


const App = (props) => {
    const [notes, setNotes] = useState(props.notes)
    const [newNote, setNewNote] = useState("Enter new note")
    const [showAll, setShowAll] = useState(true)

    const noteToShow = showAll ? notes : notes.filter(note => note.important === true)

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            id: notes.length + 1,
            date: new Date().toISOString(),
            important: Math.random() < 0.5
        }
        setNotes(notes.concat(noteObject))
        setNewNote("")
    }

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    {
                        showAll ? "Important" : "All"
                    }
                </button>
            </div>
            <ul>
                {noteToShow.map(note =>
                    <Note key={note.id} note={note}/>
                )}
            </ul>
            <form onSubmit={addNote}>
                <input type="text" value={newNote} onChange={handleNoteChange}/>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default App
import {useState, useEffect} from "react"
import Note from "./components/Note"
import noteService from "./services/notes"

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState("A new note")
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        noteService.getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])

    const notesToShow = showAll ? notes : notes.filter(note => note.important)

    const addNote = event => {
        event.preventDefault()
        const newNoteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5
        }

        noteService
            .create(newNoteObject)
            .then(returnedNote => {
                    setNotes(notes.concat(returnedNote))
                    setNewNote("")
                }
            )

    }

    const handleNoteChange = event => {
        setNewNote(event.target.value)
    }

    const toggleImportanceOf = id => {
        const noteToBeChanged = notes.find(note => note.id === id)
        const changedNote = {...noteToBeChanged, important: !noteToBeChanged.important}

        noteService
            .update(id, changedNote)
            .then(updatedNote => setNotes(notes.map(note => note.id === id ? updatedNote : note)))
            .catch(error => {
                alert(`A note with id ${id} has been deleted from server`)
                setNotes(notes.filter(note => note.id !== id))
            })
    }

    return (
        <div>
            <h1>Notes</h1>
            <button onClick={() => setShowAll(!showAll)}>
                {
                    showAll ? "Important only" : "All"
                }
            </button>
            <ul>
                {
                    notesToShow.map(note => <Note key={note.id} note={note}
                                                  toggleImportance={() => toggleImportanceOf(note.id)}/>)
                }
            </ul>
            <form onSubmit={addNote}>
                <input type="text" value={newNote} onChange={handleNoteChange}/>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default App
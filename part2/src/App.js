import {useState} from "react";

const Filter = ({handler}) => {
    return (
        <div>
            <h2>The filter</h2>
            <form>
                Names to be shown: <input type="text" onChange={handler}/>
            </form>
        </div>
    )
}

const Persons = ({persons}) => {
    return (
        <div>
            {
                persons.map(person => <div key={person.id}>{person.name} - {person.phone}</div>)
            }
        </div>
    )
}

const InfoAdder = (props) => {
    return (
        <form onSubmit={props.addNewPersonHandler}>
            <div>
                Name: <input type="text" onChange={props.personNameChangeHandler}/>
                <br/>
                Phone: <input type="text" onChange={props.phoneChangeHandler}/>
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

const App = () => {
    const [persons, setPersons] = useState([
        {
            id: 1,
            name: "Alex",
            phone: "+375(33)4566789"
        }
    ])
    const [showAll, setShowAll] = useState(persons)
    const [newName, setNewName] = useState("")
    const [newPhone, setNewPhone] = useState("")

    const addNewPerson = (event) => {
        event.preventDefault()
        const newPersonObject = {
            id: persons.length + 1,
            name: newName,
            phone: newPhone
        }
        if (persons.filter(person => person.name === newPersonObject.name).length === 0) {
            setPersons(persons.concat(newPersonObject))
            setNewName("")
            setNewPhone("")
        } else {
            alert(`${newPersonObject.name} is already exists in the list`)
        }
    }

    const handlePersonNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handlePhoneChange = (event) => {
        setNewPhone(event.target.value)
    }

    const filterPersons = (event) => {
        if (event.target.value !== "") {
            setShowAll(persons.filter(person => person.name.includes(event.target.value)))
        } else {
            setShowAll(persons)
        }
    }

    return (
        <div>
            <Filter handler={filterPersons}/>
            <h2>The phonebook</h2>
            <InfoAdder addNewPersonHandler={addNewPerson}
                       personNameChangeHandler={handlePersonNameChange}
                       phoneChangeHandler={handlePhoneChange}/>
            <h2>Numbers</h2>
            <Persons persons={showAll}/>
        </div>
    )
}

export default App
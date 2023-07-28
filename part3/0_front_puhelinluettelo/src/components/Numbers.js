import React from 'react'

const Numbers = ({ filteredPersons, personDelete }) => {
    return (
        <>
            <h2>Numbers</h2>
            {filteredPersons.map(person =>
                <p key={person.id}>
                    <span role="img" aria-label='person emoji'>🧑</span> {person.name}
                    {" "}
                    <span role="img" aria-label='phone emoji'>📞</span> {person.number}
                    {" "}
                    <button onClick={() => personDelete(person)}><span role="img" aria-label='thrash can emoji for deleting'>🗑️</span></button></p >)
            }
        </>
    )
}
export default Numbers
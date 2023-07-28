import React from 'react'

const AddNewPerson = ({ header, addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
        <>
            <h3>{header}</h3>
            <form onSubmit={addName}>
                <div>
                    <span role="img" aria-label='person emoji'>🧑</span> name: <input
                        value={newName}
                        onChange={handleNameChange} />
                </div>
                <div><span role="img" aria-label='phone emoji'>📞</span> number: <input
                    value={newNumber}
                    onChange={handleNumberChange} /></div>
                <div>
                    <button type="submit"><span role="img" aria-label='plus emoji'>➕</span> add</button>
                </div>
            </form>
        </>
    )
}
export default AddNewPerson
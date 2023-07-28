import React from 'react'

const Filter = ({ header, newFilter, handleFilterChange }) => {
    return (
        <>
            <h3>{header}</h3>
            <div><span role="img" aria-label='enter filter'>🔍</span><input value={newFilter} onChange={handleFilterChange} /></div>
        </>
    )
}
export default Filter
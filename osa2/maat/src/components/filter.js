import React from 'react'

const Filter = ({filter, onFilterChange}) => {
    return(
        <p>Find countries:  <input value={filter} onChange={onFilterChange}/></p>
    )
}
export default Filter
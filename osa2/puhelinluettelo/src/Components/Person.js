import React from 'react'

const Person = ({ name, number, deleteFunction }) => {
  return (
    <div>
      {name} {number}
      <button onClick={deleteFunction}>Delete</button>
    </div>
  )
}

export default Person
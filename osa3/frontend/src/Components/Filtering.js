import React from 'react'

const Filtering = ({onChangeFunction}) => {
    return(
        <div>
            <h2>Filter names</h2>
            <input onChange ={onChangeFunction}/>  
        </div>
    )
}

export default Filtering
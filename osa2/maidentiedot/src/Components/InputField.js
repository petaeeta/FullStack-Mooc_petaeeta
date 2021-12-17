import React from 'react'

const InputField = ({onChangeFunction}) => {
    return(
        <div>
            Find countries
            <input onChange ={onChangeFunction}/>  
        </div>
    )
}

export default InputField
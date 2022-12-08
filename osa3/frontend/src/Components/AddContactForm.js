import React from 'react'

const AddContactForm = ({onSubmitFunction, nameValue, nameChangeHandler, numberValue, numberChangeHandler}) => {
    return(
        <div>
            <h2>Add a new contact</h2>
            <form onSubmit={onSubmitFunction}>
                <div>
                name: <input value={nameValue} onChange={nameChangeHandler}/>
                </div>
                <div>
                    number: <input value={numberValue} onChange={numberChangeHandler}/>
                </div>
                <div>
                  <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default AddContactForm
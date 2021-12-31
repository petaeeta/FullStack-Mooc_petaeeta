import React from 'react'
import SpecificView from './SpecificView'

const Country = ({filteredCountries, showFunction}) => {

    if (filteredCountries.length > 1){
        return(
            <div>
                {filteredCountries.map((props) => 
                <div key={props.cca2}>
                    {props.name.common}
                    <button onClick={() => showFunction(props.name.common)}>show</button>
                </div>)}
            </div>
        )
    }

    const country = filteredCountries[0]
    const values = Object.values(country.languages)
    return(
    <div>
      <SpecificView country={country} values={values} />
    </div>
    )
  }

export default Country
import React from 'react'
import Country from './Country'

const FilteredCountries = ({filter, countries, showFunction}) => {
    if(filter === ''){
        return (
            <div></div>
        )
    }

    const filteredCountries = countries.filter((props) => props.name.common.toLowerCase().includes(filter.toLowerCase()))
    if(filteredCountries.length === 0){
        return(
            <div>
                No countries found.
            </div>
        )
    }
    else if (filteredCountries.length > 10){
        return(
            <div>
                Too many matches, specify further.
            </div>
        )
    }
    return(
        <div>
            <Country filteredCountries={filteredCountries} showFunction={showFunction}/>
        </div>
    )
}

export default FilteredCountries
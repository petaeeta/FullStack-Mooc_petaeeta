import React from 'react'
import Country from './Country'

const FilteredCountries = ({filter, countries}) => {
    console.log(countries)
    if(filter === ''){
        return (
            <div></div>
        )
    }

    // const filteredCountries = countries[0].name
    const filteredCountries = countries.filter((props) => props.name.common.toLowerCase().includes(filter.toLowerCase()))

    console.log(filteredCountries.length)
    if (filteredCountries.length > 10){
        return(
            <div>
                Too many matches, specify further.
            </div>
        )
    }
    
    return(
        <div>
            <Country filteredCountries={filteredCountries}/>
        </div>
    )
}

export default FilteredCountries
import React from 'react'

const SpecificView = ({country, values}) => {
    return(
        <div>
        <h2>{country.name.common}</h2>
        <div>Capital: {country.capital[0]}</div>
        <div>Population: {country.population}</div>
        <h3>Languges</h3>
        <ul>
            {values.map((props) => <li key={props}>{props}</li>)}
        </ul>
        <img src={country.flags.png} alt="Flag of the country"></img>
        </div>
    )

}

export default SpecificView

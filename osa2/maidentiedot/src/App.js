import React, { useEffect, useState } from 'react'
import axios from 'axios'
import InputField from './Components/InputField'
import FilteredCountries from './Components/FilteredCountries'

const App = () => {
  const [allCountries, setCountries] = useState([])
  const [filterField, setFiltering] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleFiltering = (event) => {
    setFiltering(event.target.value)
  }

  const showFunction = (name) => {
    setFiltering(name)
  }

  return(
    <div>
      <InputField onChangeFunction={handleFiltering} />
      <FilteredCountries filter={filterField} countries={allCountries} showFunction={showFunction}/>
    </div>
  )
}

export default App;

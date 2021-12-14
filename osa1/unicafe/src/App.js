import React, { useState } from 'react'

const Statistics = ({ good, neutral, bad}) => {
  if (good+bad+neutral === 0) {
    return(
      <div>No feedback given</div>
    )
  }
  return(
    <div>
      <table>
        <thead>
          <tr>
            <th>Statistics</th>
          </tr>
        </thead>
        <tbody>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={good+bad+neutral}/>
      <StatisticLine text="average" value={(good-bad)/(good+bad+neutral)}/>
      <StatisticLine text="positive" value={(good/(good+bad+neutral))*100} unit='%'/>
      </tbody>
      </table>
    </div>
  )
}

const Button = ({ clickEvent, label }) => {
  return (
    <button onClick={clickEvent}>{label}</button>
  )
}

const StatisticLine = ({ text, value, unit }) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
      <td>{unit}</td>
    </tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button clickEvent={() => setGood(good+1)} label='good'/>
      <Button clickEvent={() => setNeutral(neutral+1)} label='neutral'/>
      <Button clickEvent={() => setBad(bad+1)} label='bad'/>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
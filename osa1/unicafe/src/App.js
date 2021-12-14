import React, { useState } from 'react'

const Statistics = ({ good, neutral, bad}) => {
  if (good+bad+neutral === 0) {
    return(
      <div>No feedback given</div>
    )
  }
  return(
    <div>
      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {good+bad+neutral}</div>
      <div>average {(good-bad)/(good+bad+neutral)}</div>
      <div>positive {good/(good+bad+neutral)}%</div>
    </div>
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
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
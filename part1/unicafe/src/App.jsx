import { useState } from 'react'

const Header = ({displayText}) => (
  <h2>
    {displayText}
  </h2>
)

const Statistics = ({good, neutral, bad}) => {
  const sum = good + neutral + bad

  return (
    <div>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>

      <div>all {sum}</div>
      <div>average {((good - bad) / sum) * 100}</div>
      <div>positive {(good / sum) * 100} %</div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <Header displayText="give feedback"/>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <Header displayText="statistics"/>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App
import { useState } from 'react'

const Header = ({displayText}) => (
  <h2>
    {displayText}
  </h2>
)

const Statistics = ({displayText, value}) => (
  <div>
    {displayText} {value}
  </div>
)

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
      <Statistics displayText="good" value={good}/>
      <Statistics displayText="neutral" value={neutral}/>
      <Statistics displayText="bad" value={bad}/>
    </div>
  )
}

export default App
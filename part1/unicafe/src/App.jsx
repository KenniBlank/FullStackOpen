import { useState } from 'react'

const Header = ({displayText}) => (
  <h2>
    {displayText}
  </h2>
)

const Button = (props) => {
  return (
    <button onClick={props.onClickFunction}>{props.text}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const sum = good + neutral + bad

  if (sum == 0){
    return (
      <div>
        No feedback given        
      </div>
    )
  }
  return (
    <div>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={sum} />
      <StatisticsLine text="average" value={((good - bad) / sum)} />
      <StatisticsLine text="positive" value={(good / sum) * 100}/>
    </div>
  )
}

const StatisticsLine = (props) => {
  if (props.text == "positive") {
    return (
      <div>
        {props.text} {props.value} %
      </div>
    )
  }

  return (
    <div>
      {props.text} {props.value}    
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


      <Button onClickFunction={() => setGood(good + 1)} text="good" />
      <Button onClickFunction={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClickFunction={() => setBad(bad + 1)} text="bad" />

      <Header displayText="statistics"/>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App
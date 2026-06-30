import { useState } from 'react'

const Statistics = (props) => {

  return(
    <div>
    <h1>statistics</h1>

    <div>good {props.good}</div>
    <div>neutral {props.neutral}</div>
    <div>bad {props.bad}</div>
    <div>all {props.all}</div>
    <div>average {props.average}</div>
    <div>positive {props.positive} %</div>
    </div>
  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good+1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral+1)
  }

  const handleBadClick = () => {
    setBad(bad+1)
  }

  const all = good + neutral + bad
  const totalScore = (good * 1) + (neutral * 0) + (bad * -1)
  const average = all === 0 ? 0 : totalScore /all //prevent divide by 0
  const positive = all === 0 ? 0 : (good / all) * 100

  return (

  <div>
    <h1>give feedback</h1>

    <button onClick={handleGoodClick}>good</button>
    <button onClick={handleNeutralClick}>neutral</button>
    <button onClick={handleBadClick}>bad</button>

    <h1>statistics</h1>

    <Statistics 
      good={good}
      neutral={neutral}
      bad={bad}
      all={all}
      average={average.toFixed(2)}
      positive={positive.toFixed(2)}
    />
  </div>
)
  
}

export default App
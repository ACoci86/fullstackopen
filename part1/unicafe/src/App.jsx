import { useState } from 'react'

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

    <div>good {good}</div>
    <div>neutral {neutral}</div>
    <div>bad {bad}</div>
    <div>all {all}</div>
    <div>average {average.toFixed(2)}</div>
    <div>positive {positive.toFixed(2)} %</div>
  </div>
)
  
}

export default App
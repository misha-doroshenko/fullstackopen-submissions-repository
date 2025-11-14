import { useState } from 'react'

const Header = ({text}) => <h2>{text}</h2>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const FeedbackCounter = ({counter, text }) => <p>{text} {counter}</p>

const AverageScore = ({good, neutral, bad}) => {
  const calculateAverage = (good, neutral, bad) => (good - bad) / (good + neutral + bad)
  return <p>average {calculateAverage(good=good, neutral=neutral, bad=bad)}</p>
}

const PositiveScore = ({good, all}) => {
  const calculatePercentage = (good, all) => good / all * 100
  return <p>positive {calculatePercentage(good=good, all=all)} %</p>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleClickGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAll(updatedGood + neutral + bad)
  }
  const handleClickNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAll(good + updatedNeutral + bad)
  }
  const handleClickBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setAll(good + neutral + updatedBad)
  }

  return (
    <div>
      <Header text='give feedback'/>
      <Button onClick={handleClickGood} text='good'/>
      <Button onClick={handleClickNeutral} text='neutral'/>
      <Button onClick={handleClickBad} text='bad'/>

      <Header text='statistics'/>
      <FeedbackCounter counter={good} text='good'/>
      <FeedbackCounter counter={neutral} text='neutral'/>
      <FeedbackCounter counter={bad} text='bad'/>
      <FeedbackCounter counter={all} text='all'/>
      <AverageScore good={good} neutral={neutral} bad={bad}/>
      <PositiveScore good={good} all={all}/>
      
    </div>
  )
}

export default App
import { useState } from 'react'

const Header = ({text}) => <h2>{text}</h2>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value, symbolAfterValue=''}) => <p>{text} {value}{symbolAfterValue}</p>

const Statistics = ({good, neutral, bad, all}) => {
  const calculateAverage = (good, neutral, bad) => (good - bad) / (good + neutral + bad)
  const calculatePercentage = (good, all) => good / all * 100

  if (all > 0) {
    return (
      <>
        <Header text='statistics'/>
      
        <StatisticLine text='good' value={good}/>
        <StatisticLine text='neutral' value={neutral}/>
        <StatisticLine text='bad' value={bad}/>
        <StatisticLine text='all' value={all}/>
        <StatisticLine text='average' value={calculateAverage(good, neutral, bad)}/>
        <StatisticLine text='positive' value={calculatePercentage(good, all)} symbolAfterValue=' %'/>
      </>
    )
  }
  return <p>No feedback given</p>

}

const App = () => {
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
      
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

export default App
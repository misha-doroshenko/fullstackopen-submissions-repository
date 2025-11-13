import { useState } from 'react'

const Header = ({text}) => <h2>{text}</h2>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const FeedbackCounter = ({counter, text }) => <p>{text} {counter}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => setGood(good + 1)
  const handleClickNeutral = () => setNeutral(neutral + 1)
  const handleClickBad = () => setBad(bad + 1)

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
      
    </div>
  )
}

export default App
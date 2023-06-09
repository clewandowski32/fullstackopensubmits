import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Display = ({text}) => (<h1>{text}</h1>)

const StatisticLine = ({text, value}) => {
  return(
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  )
}

const Stats = ({good, neutral, bad}) => {
  const all = (good, neutral, bad) => (good + neutral + bad)
  const average = (good, neutral, bad) => {
    let goodWeight = good
    let badWeight = bad * -1
    return(
      all(goodWeight, 0, badWeight) / all(good, neutral, bad)
    )
  }
  const positive = (good, neutral, bad) => {
    return(
      (good / all(good, neutral, bad))  * 100 + ' %'
    )
  }
  if(all(good, neutral, bad) > 0){
    return(
      <div>
        <StatisticLine text='good' value={good}/>
        <StatisticLine text='neutral' value={neutral}/>
        <StatisticLine text='bad' value={bad}/>  
        <StatisticLine text='all' value={all(good, neutral, bad)}/>
        <StatisticLine text='average' value={average(good, neutral, bad)}/>
        <StatisticLine text='positive' value={positive(good, neutral, bad)}/>
      </div>  
    )
  }
  return(<div>No feedback given</div>)
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  
  const setValue = (setter, newValue) => {
    setter(newValue)
  }

  return (
    <div>
      <Display text='give feedback'/>
      <Button handleClick={() => setValue(setGood, good + 1)} text='good'/>
      <Button handleClick={() => setValue(setNeutral, neutral + 1)} text='neutral'/>
      <Button handleClick={() => setValue(setBad, bad + 1)} text='bad'/>
      <Display text='statistics'/>
      
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
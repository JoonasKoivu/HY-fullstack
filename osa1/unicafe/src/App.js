import { useState } from 'react';

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td> {value}</td>
    </tr>
    )
}

const Statistics = (props) => {
  if(props.all === 0){
    return <p>No feedback has been given.</p>
  }
  return(
    <table>
      <tbody>
        <StatisticLine text='good' value={props.good}/>
        <StatisticLine text='neutral' value={props.neutral}/>
        <StatisticLine text='bad' value={props.bad}/>
        <StatisticLine text='all' value={props.all}/>
        <StatisticLine text='average' value={props.average}/>
        <StatisticLine text='positive' value={props.positive}/>
      </tbody>
    </table>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + bad + neutral
  const average = (good - bad)/all
  const positive = good/all*100 + ' %'

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick={handleNeutralClick} text='neutral'/>
        <Button handleClick={handleBadClick} text='bad' />
      </div>
      <h1>statistics</h1>
      <div>
        <Statistics 
          good={good}
          neutral={neutral}
          bad={bad}
          all={all}
          average={average}
          positive={positive}
          />
      </div>
    </div>
  )
}

export default App;

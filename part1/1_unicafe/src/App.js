import { useState } from 'react'



const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value, isPercent, isDecimal }) => {

  const fixedValue = isDecimal ? value.toFixed(1) : value
  if (isPercent) {
    return (
      <tr><td>{text}</td><td>{fixedValue}%</td></tr>
    )
  }
  return (
    <tr><td>{text}</td><td>{fixedValue}</td></tr>)
}

const Statistics = ({ good, neutral, bad, totalClicks, feedbackAverage, positivePercent }) => {
  if (totalClicks === 0) {
    return (
      <div>
        <h1>Palauteleayson Tilastot</h1>
        <p>Ei annettuja palautteita</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Palauteleayson Tilastot</h1>
      <i>Sitten viimeisen sivuston latauksen</i>
      <table>
        <tbody>
          <StatisticLine text="😊" value={good} />
          <StatisticLine text="😐" value={neutral} />
          <StatisticLine text="🙁" value={bad} />
          <StatisticLine text="Σ" value={totalClicks} />
          <StatisticLine text="μ" value={feedbackAverage} isDecimal={true} />
          <StatisticLine text="😊" value={positivePercent} isPercent={true} isDecimal={true} />
        </tbody>
      </table>
    </div>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [totalFeedback, setTotalFeedback] = useState(0)
  const [totalClicks, setTotalClicks] = useState(0)
  const [feedbackAverage, setFeedbackAverage] = useState(0)
  const [positivePercent, setPositivePercent] = useState(0)

  const handleGoodClick = () => {
    const goodValue = good + 1
    setGood(goodValue)
    addToAverageAndTotal(1, goodValue)
  }
  const handleNeutralClick = () => {
    const neutralValue = neutral + 1
    setNeutral(neutralValue)
    addToAverageAndTotal(0, 0)
  }
  const handleBadClick = () => {
    const badValue = bad + 1
    setBad(badValue)
    addToAverageAndTotal(-1, 0)
  }
  const addToAverageAndTotal = (feedbackValue, goodValue) => {
    const totalClicksValue = totalClicks + 1
    const totalFeedbackValue = totalFeedback + feedbackValue
    const averageValue = totalFeedbackValue / totalClicksValue
    console.log("good", good)
    console.log("goodValue", goodValue)
    console.log("totalClicksV", totalClicksValue)
    goodValue = goodValue === 0 ? good : goodValue
    const positivePercentValue = (goodValue / totalClicksValue) * 100
    setPositivePercent(positivePercentValue)

    setTotalClicks(totalClicksValue)
    setFeedbackAverage(averageValue)
    setTotalFeedback(totalFeedbackValue)
  }



  return (
    <>
      <div>
        <h1>Palauteleayson</h1>
        <Button handleClick={handleGoodClick} text='😊' />
        <Button handleClick={handleNeutralClick} text='😐' />
        <Button handleClick={handleBadClick} text='🙁' />
      </div>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        totalClicks={totalClicks}
        feedbackAverage={feedbackAverage}
        positivePercent={positivePercent} />
    </>
  )
}

export default App
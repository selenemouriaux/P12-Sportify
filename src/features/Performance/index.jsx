import './style.css'

const Performance = ({performanceData}) => {
  return (
    <div className="performance chartCard">
      {`performances : ${JSON.stringify(performanceData)}`}
    </div>
  )
}

export default Performance;
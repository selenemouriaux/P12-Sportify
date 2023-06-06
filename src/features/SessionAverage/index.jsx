import './style.css'

const SessionAverage = ({sessionData}) => {
  return (
    <div className="sessionAverage chartCard">
      {`moyenne des sessions : ${JSON.stringify(sessionData)}`}
    </div>
  )
}

export default SessionAverage;
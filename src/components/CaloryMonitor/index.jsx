import CaloryType from "./CaloryType"

const CaloryMonitor = ({ caloryExpense }) => {
  const burntCaloriesList = Object.entries(caloryExpense).map(([k, v]) => ({
    type: k,
    value: v,
  }))
  return (
    <div className="caloryMonitor chartCard">
      {burntCaloriesList.map(({ type, value }) => (
        <CaloryType key={type} type={type} value={value} />
      ))}
    </div>
  )
}

export default CaloryMonitor

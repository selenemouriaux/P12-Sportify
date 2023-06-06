import './style.css'

const CaloryMonitor = ({ userInfo }) => {
  return (
    <div className="caloryMonitor chartCard">
      <h2>{userInfo?.data?.userInfos?.firstName} !</h2>
      // TODO : map on keyData par index pour nom et value avec un sous composant icone etc
    </div>
  )
}

export default CaloryMonitor;
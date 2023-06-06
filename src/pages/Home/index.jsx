import {useContext, useEffect, useState} from "react";
import {Calories, Daily, Overall, Perf, Session,} from "../../features";
import {userActivity, userAverageSessions, userInfo, userPerformance} from "../../service/API/userApi";
import './style.css'
import SettingsContext from "../../service/SettingsContext";

const Home = () => {
  const { userId, source } = useContext(SettingsContext)
  const [userData, setUserData] = useState(null)
  const [dailyData, setDailyData] = useState(null)
  const [sessionData, setSessionData] = useState(null)
  const [performanceData, setPerformanceData] = useState(null)

  const initData = async () => {
    setUserData(await userInfo(source, userId));
    setDailyData(await userActivity(source, userId));
    setSessionData(await userAverageSessions(source, userId));
    setPerformanceData(await userPerformance(source, userId));
  }

  useEffect(() => {
    initData()
  }, [])

  const message = "Félicitations ! Vous avez explosé vos objectifs hier 👏"
  return (
    <div className="home">
      <div className="greetings">
        <h1>Bonjour <span className="userName">{userData?.data?.userInfos?.firstName ?? 'bel(le) inconnu(e)'}</span>,</h1>
        <p className="welcomeMessage">{message ?? 'Je me connecte / inscris'}</p>
      </div>
      <div className="chartsBox">
        {dailyData && <Daily dailyData={dailyData}/>}
        {sessionData && <Session sessionData={sessionData}/>}
        {performanceData && <Perf performanceData={performanceData}/>}
        <Overall/>
        {userData && <Calories userInfo={userData}/>}
      </div>
    </div>
  )
}

export default Home;
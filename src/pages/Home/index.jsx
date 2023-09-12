import { useContext, useEffect, useState } from "react"
import { Calories, Daily, Overall, Perf, Session } from "../../components"
import { formatPerfsData } from "../../utils"
import {
  userActivity,
  userAverageSessions,
  userInfo,
  userPerformance,
} from "../../service/API"
import "./style.css"
import SettingsContext from "../../service/Context"

const Home = () => {
  const { userId, source } = useContext(SettingsContext)
  const [userData, setUserData] = useState(null)
  const [dailyData, setDailyData] = useState(null)
  const [sessionData, setSessionData] = useState(null)
  const [performanceData, setPerformanceData] = useState(null)

  const initData = async () => {
    setUserData(await userInfo(source, userId))
    setDailyData(await userActivity(source, userId))
    setSessionData(await userAverageSessions(source, userId))
    setPerformanceData(formatPerfsData(await userPerformance(source, userId)))
  }

  useEffect(() => {
    initData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let timer
    function handleResize() {
      clearTimeout(timer)
      timer = setTimeout(() => {
        window.location.reload()
      }, 100)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const message = "Félicitations ! Vous avez explosé vos objectifs hier 👏"
  return (
    <div className="home">
      <div className="greetings">
        <h1>
          Bonjour{" "}
          <span className="userName">
            {userData?.data?.userInfos?.firstName ?? "bel(le) inconnu(e)"}
          </span>
          ,
        </h1>
        <p>{message ?? "Je me connecte / inscris"}</p>
      </div>
      <div className="chartsBox">
        {dailyData && <Daily dailyData={dailyData} />}
        {sessionData && <Session sessionData={sessionData} />}
        {performanceData && <Perf performanceData={performanceData} />}
        {userData && (
          <Overall score={userData.data?.todayScore || userData.data?.score} />
        )}
        {userData && <Calories caloryExpense={userData?.data?.keyData} />}
      </div>
    </div>
  )
}

export default Home

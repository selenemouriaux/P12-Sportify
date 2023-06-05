import './style.css'
import {default as user} from '../../data/user2.json'
import DailyActivity from "../../components/DailyActivity";
import SessionAverage from "../../components/SessionAverage";
import CaloryMonitor from "../../components/CaloryMonitor";
import Performance from "../../components/Performance";

const Home = () => {
  const message = "Félicitations ! Vous avez explosé vos objectifs hier 👏"
  return (
    <div className="home">
      <h1>Bonjour <span className="userName">{user?.data?.userInfos?.firstName ?? 'bel(le) inconnu(e)'}</span>,</h1>
      <p className="welcomeMessage">{message?? 'Je me connecte / inscris'}</p>
      <div className="graphsBox">
        <DailyActivity />
        <SessionAverage />
        <Performance />
        <CaloryMonitor />
      </div>
    </div>
  )
}

export default Home;
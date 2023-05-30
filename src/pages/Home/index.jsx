import './style.css'
import {default as user} from '../../data/user2.json'

const Home = () => {
  const message = "Félicitations ! Vous avez explosé vos objectifs hier "
  return (
    <>
      <h1>Bonjour <span className="userName">{user?.data?.userInfos?.firstName ?? 'bel(le) inconnu(e)'}</span>,</h1>
      <p className="welcomeMessage">{message?? 'Je me connecte / inscris'}</p>
    </>
  )
}

export default Home;
import IOSButton from "../../components/IOSButton"
import { useContext } from "react"
import SettingsContext from "../../service/Context"

const Profile = () => {
  const options = [12, 18]
  const { userId, setUserId } = useContext(SettingsContext)
  return (
    <div className="selectionBlock">
      <h2 className="selectionTitle">
        Veuillez sélectionner de quel utilisateur visualiser les données :
      </h2>
      <div>
        {options.map((option) => (
          <IOSButton
            key={option}
            name="userId"
            option={option}
            active={userId}
            setVal={setUserId}
          />
        ))}
      </div>
    </div>
  )
}

export default Profile

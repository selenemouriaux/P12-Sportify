import IOSButton from "../../components/IOSButton";
import {useContext} from "react";
import SettingsContext from "../../service/SettingsContext";
import './style.css'

const Profile = () => {
  const options = [12, 18]
  const { userId, setUserId } = useContext(SettingsContext);
  return (
    <>
      <h2>Veuillez sélectionner de quel utilisateur visualiser les données :</h2>
      <div className="selectionPanel">
        {options.map(option =>
          <IOSButton key={option} name="userId" option={option} active={userId} setVal={setUserId}/>
        )}
      </div>
    </>
  )
}

export default Profile;
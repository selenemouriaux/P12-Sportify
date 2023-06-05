import IOSButton from "../../components/IOSButton";
import {useContext} from "react";
import SettingsContext from "../../service/SettingsContext";
import './style.css'

const Settings = () => {
  const options = ['local', 'API']
  const { source, setSource } = useContext(SettingsContext);
  return (
    <>
      <h2>Veuillez sélectionner la provenance des données :</h2>
      <div className="selectionPanel">
        {options.map(option =>
          <IOSButton key={option} name="sourceType" option={option} active={source} setVal={setSource}/>
        )}
      </div>
    </>
  )
}

export default Settings;
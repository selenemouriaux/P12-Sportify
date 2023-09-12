import IOSButton from "../../components/IOSButton"
import { useContext } from "react"
import SettingsContext from "../../service/Context"

const Settings = () => {
  const options = ["local", "API"]
  const { source, setSource } = useContext(SettingsContext)
  return (
    <div className="selectionBlock">
      <h2 className="selectionTitle">
        Veuillez sélectionner la provenance des données :
      </h2>
      <div>
        {options.map((option) => (
          <IOSButton
            key={option}
            name="sourceType"
            option={option}
            active={source}
            setVal={setSource}
          />
        ))}
      </div>
    </div>
  )
}

export default Settings

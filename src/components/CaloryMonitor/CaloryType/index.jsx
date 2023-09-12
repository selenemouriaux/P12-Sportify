import "./style.css"
import caloriesImg from "../../../assets/images/sportsee_calories_burnt.png"
import proteinesImg from "../../../assets/images/sportsee_proteins.png"
import glucidesImg from "../../../assets/images/sportsee_carbs.png"
import lipidesImg from "../../../assets/images/sportsee_lipids.png"

const CaloryType = ({ type, value }) => {
  const CAL_SPECS = {
    calorieCount: {
      label: "Calories",
      unit: "kCal",
      logo: caloriesImg,
      color: "red",
    },
    proteinCount: {
      label: "Protéines",
      unit: "g",
      logo: proteinesImg,
      color: "blue",
    },
    carbohydrateCount: {
      label: "Glucides",
      unit: "g",
      logo: glucidesImg,
      color: "yellow",
    },
    lipidCount: {
      label: "Lipides",
      unit: "g",
      logo: lipidesImg,
      color: "pink",
    },
  }

  return (
    <div className="caloryType">
      <div className={`caloryLogoBox ${CAL_SPECS[type].color}`}>
        <img
          className="caloryLogo"
          src={CAL_SPECS[type].logo}
          alt={CAL_SPECS[type].label}
        />
      </div>
      <div className="caloryInfo">
        <p className="caloryValue">
          {value}
          {CAL_SPECS[type].unit}
        </p>
        <p className="caloryCaption">{CAL_SPECS[type].label}</p>
      </div>
    </div>
  )
}

export default CaloryType

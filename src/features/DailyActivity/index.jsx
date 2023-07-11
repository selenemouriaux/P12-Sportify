import './style.css'
import {useRef, useEffect} from "react";
import drawDailyActivity from '../../components/D3/dailiesChart'
import resetGraphSize from "../../components/D3/resetGraphSize";
import generateDimensions from "../../utils/generateDimensions";

const DailyActivity = ({dailyData}) => {

  const svgDailyRef = useRef();
  const canvasRef = useRef();
  const chartMargins = {
    top: 25,
    right: 50,
    bottom: 50,
    left: 25,
  }

  useEffect(() => {
    resetGraphSize(svgDailyRef)
    const dimensions = generateDimensions(canvasRef, chartMargins)
    drawDailyActivity(dailyData, svgDailyRef, dimensions)
  }, [])

  return (
    <div className="dailyActivity chartCard">
      <div className="dailyActivityHeader">
        <span>Activité Quotidienne</span>
        <ul className="dailyActivityCaption">
          <li className="dailyActivityBar">Poids (kg)</li>
          <li className="dailyActivityBar">Calories brûlées (kCal)</li>
        </ul>
      </div>
      <div className="canvas" ref={canvasRef}>
        <svg ref={svgDailyRef}>
        </svg>
        <div id="dailyTooltip">
          <div className="dailyKg"><span></span>kg</div>
          <div className="dailyKCal"><span></span>kCal</div>
        </div>
      </div>
    </div>
  )
}

export default DailyActivity;
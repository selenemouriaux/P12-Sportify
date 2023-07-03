import './style.css'
import {useRef, useEffect} from "react";
import drawDailyActivity from '../../components/D3/dailiesChart'
import generateDimensions from "../../utils/generateDimensions";

const DailyActivity = ({dailyData}) => {

  const svgDailyRef = useRef();
  const tooltipRef = useRef();
  const canvasRef = useRef();
  const chartMargins = {
    top: 25,
    right: 50,
    bottom: 50,
    left: 25,
  }

  useEffect(() => {
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
      <div ref={tooltipRef} className="dailyTooltip"></div>
      <div className="canvas" ref={canvasRef}>
        <svg id="dailyChart" ref={svgDailyRef}/>
      </div>
    </div>
  )
}

export default DailyActivity;
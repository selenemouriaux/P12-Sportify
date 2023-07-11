import './style.css'
import {useEffect, useRef} from "react";
import drawSessionAverage from "../../components/D3/sessionChart";
import resetGraphSize from "../../components/D3/resetGraphSize";
import generateDimensions from "../../utils/generateDimensions";

const SessionAverage = ({sessionData}) => {

  const averageSizer = useRef();
  const svgAverageRef = useRef();
  const chartMargins = {
    top: 50,
    right: 0,
    bottom: 25,
    left: 0,
  }

  useEffect(() => {
    resetGraphSize(svgAverageRef)
    const dimensions = (generateDimensions(averageSizer, chartMargins));
    drawSessionAverage(sessionData, svgAverageRef, dimensions)
  }, [])


  return (
    <div className="sessionAverage chartCard">
      <div className="averageHeader">
        <span>Durée moyenne des session</span>
      </div>
      <div className="canvas" ref={averageSizer}>
        <svg ref={svgAverageRef}></svg>
        <div id="averageTooltip">
          <div className="sessionLength"><span>15</span> min</div>
        </div>
      </div>
    </div>
  )
}

export default SessionAverage;
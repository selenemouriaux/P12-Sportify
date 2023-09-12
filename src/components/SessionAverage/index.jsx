import "./style.css"
import { useEffect, useRef } from "react"
import drawSessionAverage from "../../utils/D3/sessionChart"
import { resetGraphSize, generateDimensions } from "../../utils"

const SessionAverage = ({ sessionData }) => {
  const averageSizer = useRef()
  const svgAverageRef = useRef()
  const chartMargins = {
    top: 10,
    right: 20,
    bottom: 30,
    left: 20,
  }

  useEffect(() => {
    resetGraphSize(svgAverageRef)
    const dimensions = generateDimensions(averageSizer, chartMargins)
    drawSessionAverage(sessionData, svgAverageRef, dimensions)
  }, [])

  return (
    <div className="sessionAverage chartCard">
      <div className="averageHeader">
        <span>Durée moyenne des sessions</span>
      </div>
      <div className="canvas" ref={averageSizer}>
        <svg ref={svgAverageRef}></svg>
        <div id="averageTooltip">
          <div className="sessionLength">
            <span></span> min
          </div>
        </div>
      </div>
    </div>
  )
}

export default SessionAverage

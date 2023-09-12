import { useEffect, useRef } from "react"
import drawPerfs from "../../utils/D3/perfsChart"
import { resetGraphSize, generateDimensions } from "../../utils"

const Performance = ({ performanceData }) => {
  const perfsSizer = useRef()
  const svgPerfsRef = useRef()
  const chartMargins = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }

  useEffect(() => {
    resetGraphSize(svgPerfsRef)
    const dimensions = generateDimensions(perfsSizer, chartMargins)
    drawPerfs(performanceData, svgPerfsRef, dimensions)
  }, [])

  return (
    <div className="canvas performance chartCard" ref={perfsSizer}>
      <svg ref={svgPerfsRef}></svg>
    </div>
  )
}

export default Performance

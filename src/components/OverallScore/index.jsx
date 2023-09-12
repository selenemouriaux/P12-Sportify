import "./style.css"
import { useRef, useEffect, useMemo } from "react"
import { resetGraphSize, generateDimensions } from "../../utils"
import drawScore from "../../utils/D3/overallChart"

const OverallScore = ({ score }) => {
  const scoreSizer = useRef()
  const svgScoreRef = useRef()
  const chartMargins = useMemo(() => {
    return {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    }
  }, [])

  useEffect(() => {
    resetGraphSize(svgScoreRef)
    const dimensions = generateDimensions(scoreSizer, chartMargins)
    drawScore(score, svgScoreRef, dimensions)
  }, [score, chartMargins])

  return (
    <div className="overallScore chartCard">
      <div className="overallHeader">
        <span>Score</span>
      </div>
      <div className="canvas" ref={scoreSizer}>
        <svg ref={svgScoreRef}></svg>
        {score && (
          <div className="scoreText">
            <span>{score * 100}%</span>
            <p className="squeezed">de votre objectif</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default OverallScore

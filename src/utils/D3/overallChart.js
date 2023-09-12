import * as d3 from "d3"

const drawScore = (score, ref, dimensions) => {
  const squareSize = d3.min([
    dimensions.width - dimensions.margin.left - dimensions.margin.right,
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom,
  ])
  const svgFrame = d3.select(ref.current)
  svgFrame.empty()
  svgFrame.attr("width", dimensions.width).attr("height", dimensions.height)

  const outerSize = squareSize * 0.9
  const radius = outerSize / 2
  const center = {
    x: squareSize / 2,
    y: squareSize / 2,
  }

  const graph = svgFrame
    .append("g")
    .attr("width", squareSize)
    .attr("height", squareSize)
    .attr(
      "transform",
      `translate(${
        (dimensions.width + dimensions.margin.left - squareSize) / 2
      }, ${(dimensions.height + dimensions.margin.top - squareSize) / 2})`
    )

  // scales !
  const populationPie = d3
    .pie()
    .sort(null)
    .value((d) => d)
  const slices = populationPie([100 - score * 100, score * 100])
  const colors = ["#FBFBFB", "#ff0000"]
  const arc = d3
    .arc()
    .outerRadius(radius)
    .innerRadius(radius - 10)
    .cornerRadius(10)

  //draw shape
  const arcGroup = graph
    .append("g")
    .attr("transform", `translate(${center.x}, ${center.y})`)

  arcGroup
    .selectAll("path")
    .data(slices)
    .join("path")
    .attr("d", arc)
    .attr("fill", (d) => colors[d.index])
}

export default drawScore

import * as d3 from "d3"
import { findYatXbyBisection } from "../../utils"

const drawSessionAverage = (data, ref, dimensions) => {
  const svgFrame = d3.select(ref.current)
  svgFrame.empty()
  svgFrame
    .attr(
      "width",
      dimensions.width + dimensions.margin.left + dimensions.margin.right
    )
    .attr(
      "height",
      dimensions.height + dimensions.margin.top + dimensions.margin.bottom
    )
  const tooltip = d3.select("#averageTooltip")
  const weekdays = ["D", "L", "Ma", "Me", "J", "V", "S"]

  const xAccessor = (d) => d.day
  const yAccessor = (d) => d.sessionLength

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .range([
      0,
      dimensions.width + dimensions.margin.left + dimensions.margin.right,
    ])
  const reducedXScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .range([0, dimensions.width])

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([dimensions.height, 0])

  // TODO : swap for new svg element including text formatted with CSS flex rules
  const xAxis = d3
    .axisBottom(reducedXScale)
    .ticks(weekdays.length)
    .tickFormat((d) => weekdays[d % 7])

  svgFrame
    .append("g")
    .attr(
      "transform",
      `translate(${dimensions.margin.left}, ${dimensions.height})`
    )
    .classed("x axis", true)
    .style("stroke-width", 0)
    .style("color", "rgba(255,255,255, 0.7)")
    .call(xAxis)

  const graph = svgFrame
    .append("g")
    .attr(
      "width",
      dimensions.width + dimensions.margin.left + dimensions.margin.right
    )
    .attr("height", dimensions.height)
    .attr("transform", `translate(0, ${dimensions.margin.top})`)

  const lineGenerator = d3
    .line()
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(yAccessor(d)))
    .curve(d3.curveBasis)

  const defs = graph.append("defs")
  const gradient = defs
    .append("linearGradient")
    .attr("id", "svgGradient")
    .attr("x1", "0%")
    .attr("x2", "100%")
  gradient
    .append("stop")
    .attr("class", "start")
    .attr("offset", "0%")
    .attr("stop-color", "#ffdada")
    .attr("stop-opacity", 0.5)
  gradient
    .append("stop")
    .attr("class", "end")
    .attr("offset", "100%")
    .attr("stop-color", "white")
    .attr("stop-opacity", 1)

  const line = graph
    .append("path")
    .datum(data)
    .attr("d", lineGenerator)
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("stroke", "url(#svgGradient)")

  const tooltipDot = graph
    .append("circle")
    .attr("r", 5)
    .attr("fill", "white")
    .style("opacity", 0)
    .style("pointer-events", "none")

  const formattingMinutes = (duration) => {
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60
    if (!duration) return "Ò_Ó"
    return `${hours ? hours + "h " : minutes ? minutes + "m" : ""}`
  }

  const darkArea = d3
    .select(".sessionAverage")
    .append("svg")
    .attr("width", 0)
    .attr("height", "100%")
    .attr("pointer-events", "none")
    .style("position", "absolute")
    .classed("darkened", true)

  // defining 'zoning' new elements to manage hover effects
  graph
    .append("rect")
    .attr(
      "width",
      dimensions.width + dimensions.margin.left + dimensions.margin.right
    )
    .attr("height", dimensions.height)
    .style("opacity", 0)
    .on("touchmouse mousemove", function (e) {
      const mousePos = d3.pointer(e, this)
      const day = xScale.invert((mousePos[0] * 7) / 6) + 0.001
      const bisector = d3.bisector(xAccessor).left
      const index = bisector(data, day)
      const duration = yAccessor(data[index - 1])

      tooltipDot
        .style("opacity", 1)
        .attr("stroke", "rgba(255,255,255, 0.3)")
        .attr("stroke-width", 10)
        .attr("cx", mousePos[0])
        .attr("cy", findYatXbyBisection(mousePos[0], line.node()))
        .raise()

      tooltip
        .style("display", "flex")
        .style("bottom", `${duration * 3 + 40}px`)
        .style(
          "left",
          `${
            mousePos[0] + 10 > dimensions.width
              ? dimensions.width
              : mousePos[0] + 10
          }px`
        )

      tooltip.select(".sessionLength").text(formattingMinutes(duration))

      darkArea
        .attr("transform", `translate(${mousePos[0]}, 0)`)
        .attr(
          "width",
          dimensions.width +
            dimensions.margin.left +
            dimensions.margin.right -
            mousePos[0]
        )
    })
    .on("mouseleave", function () {
      tooltipDot.style("opacity", 0)
      tooltip.style("display", "none")
      darkArea.attr("width", 0)
    })
}

export default drawSessionAverage

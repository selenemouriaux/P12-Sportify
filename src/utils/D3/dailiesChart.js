import * as d3 from "d3"
import { dailyBar, localeFR } from "../../utils"

const drawDailyActivity = (data, ref, dimensions) => {
  // importing local time setup
  d3.timeFormatDefaultLocale(localeFR)
  // formatting date as per defined locale
  const dateFormatter = d3.timeFormat("%a%e")
  // defining amplitude of weights
  const minWeight = d3.min(data.map((d) => d.kilogram))
  const maxWeight = d3.max(data.map((d) => d.kilogram))
  // setting vertical offset for weight to minify amplitude in opposition to calories
  const weightOffset = parseInt((maxWeight - minWeight) / 2 + 1)

  // defining 'svgFrame' as outer frame, including graph and both axis ticks & values
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
  const tooltip = d3.select("#dailyTooltip")

  // setting up accessors for readability
  const xAccessor = (d) => dateFormatter(Date.parse(d.day))
  const yKgAccessor = (d) => d.kilogram
  const yCalAccessor = (d) => d.calories
  // defining x-axis type & domain/rate ratio, from left to right, inside svgFrame
  const xScale = d3
    .scaleBand()
    .domain(data.map(xAccessor))
    .range([0, dimensions.width])
    .padding(0.2)
  // defining first y-axis for KILOGRAMS from bottom up including offsets (styling)
  const yScaleKg = d3
    .scaleLinear()
    .domain([minWeight - weightOffset, maxWeight + weightOffset])
    .range([dimensions.height, 0])
  // defining second y-axis for CALORIES, no offsets (styling)
  const yScaleCal = d3
    .scaleLinear()
    .domain([0, d3.max(data, yCalAccessor) * 1.05])
    .range([dimensions.height, 0])

  // setting up horizontal ticks/caption alignment, style and regularity based on previously set xScale
  const xAxis = d3.axisBottom(xScale).tickPadding(20).tickSize(0)
  // setting up vertical ticks/caption alignment, style and regularity based on previously set yScaleKg
  const yAxis = d3.axisRight(yScaleKg).tickPadding(20).tickSize(0).ticks(3)

  // displaying a new svg group with x-axis previously set up info
  svgFrame
    .append("g")
    .attr(
      "transform",
      `translate(${dimensions.margin.left}, ${
        dimensions.height + dimensions.margin.top
      })`
    )
    .classed("x axis", true)
    .call(xAxis)
  // displaying a new svg group with y-axis previously set up info
  svgFrame
    .append("g")
    .attr(
      "transform",
      `translate(${dimensions.width + dimensions.margin.left}, ${
        dimensions.margin.top
      })`
    )
    .classed("y axis", true)
    .call(yAxis)

  // creating vertical grid lines
  const yAxisGrid = d3
    .axisRight(yScaleKg)
    .tickSize(dimensions.width)
    .tickFormat("")
    .ticks(3)
  // displaying y-axis grid lines previously set up BEFORE setting up the graph zone
  svgFrame
    .append("g")
    .attr(
      "transform",
      `translate(${dimensions.margin.left}, ${dimensions.margin.top})`
    )
    .classed("y axis-grid", true)
    .call(yAxisGrid)

  // defining actual graph frame and position inside svgFrame
  const graph = svgFrame
    .append("g")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)
    .attr(
      "transform",
      `translate(${dimensions.margin.left}, ${dimensions.margin.top})`
    )

  // creating a svg path to display each kilogram data properly on both its axis
  graph
    .selectAll(".kgBar")
    .data(data)
    .join("path")
    .attr("class", "kgBar")
    .attr("fill", "#282D30")
    .attr("d", (d) =>
      dailyBar(
        xScale(xAccessor(d)) + xScale.bandwidth() * 0.35,
        yScaleKg(yKgAccessor(d)),
        xScale.bandwidth() / 10,
        dimensions.height - yScaleKg(yKgAccessor(d))
      )
    )
  // same as above, paths are defined through fn in attr('d'...)
  graph
    .selectAll(".kCalBar")
    .data(data)
    .join("path")
    .attr("class", "kCalBar")
    .attr("fill", "#E60000")
    .attr("d", (d) =>
      dailyBar(
        xScale(xAccessor(d)) + xScale.bandwidth() * 0.55,
        yScaleCal(yCalAccessor(d)),
        xScale.bandwidth() / 10,
        dimensions.height - yScaleCal(yCalAccessor(d))
      )
    )

  // defining tooltip hover effects
  const mouseOver = (hoveredZone, datum) => {
    d3.select(hoveredZone).attr("fill", "rgba(196, 196, 196, 0.5)")
    // redraw bars on top of background
    graph
      .selectAll(".hoverKCalBar")
      .data(data)
      .join("path")
      .attr("class", "hoverKCalBar")
      .attr("fill", "#E60000")
      .attr("d", (d) =>
        dailyBar(
          xScale(xAccessor(datum)) + xScale.bandwidth() * 0.55,
          yScaleCal(yCalAccessor(datum)),
          xScale.bandwidth() / 10,
          dimensions.height - yScaleCal(yCalAccessor(datum))
        )
      )
      .style("pointer-events", "none")
    graph
      .selectAll(".hoverKgBar")
      .data(data)
      .join("path")
      .attr("class", "hoverKgBar")
      .attr("fill", "#282D30")
      .attr("d", (d) =>
        dailyBar(
          xScale(xAccessor(datum)) + xScale.bandwidth() * 0.35,
          yScaleKg(yKgAccessor(datum)),
          xScale.bandwidth() / 10,
          dimensions.height - yScaleKg(yKgAccessor(datum))
        )
      )
      .style("pointer-events", "none")
    // set, place & display tooltip at top and horizontally based on width AND padding
    tooltip
      .style("display", "flex")
      .style("top", 0)
      .style("left", `${xScale(xAccessor(datum)) + xScale.bandwidth() + 30}px`)
    tooltip.select(".dailyKg span").text(yKgAccessor(datum))
    tooltip.select(".dailyKCal span").text(yCalAccessor(datum))
  }

  // removing hover effects on mouse leave
  const mouseLeave = (hoveredZone) => {
    d3.select(hoveredZone).attr("fill", "transparent")
    graph.selectAll(".hoverKgBar").remove()
    graph.selectAll(".hoverKCalBar").remove()
    // remove tooltip
    tooltip.style("display", "none")
  }

  // defining 'zoning' new elements to manage hover effects
  graph
    .selectAll(".hover")
    .data(data)
    .join("rect")
    .attr("class", "hover")
    .attr("x", (d) => xScale(xAccessor(d)))
    .attr("y", 0)
    .attr("width", xScale.bandwidth())
    .attr("height", dimensions.height)
    .attr("fill", "transparent")
    .on("mouseover", function (e, d) {
      mouseOver(this, d)
    })
    .on("mouseleave", function () {
      mouseLeave(this)
    })
}

export default drawDailyActivity

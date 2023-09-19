import * as d3 from "d3"

const drawPerfs = (data, ref, dimensions) => {
  const squareSize = d3.min([dimensions.width, dimensions.height])
  const svgFrame = d3.select(ref.current)
  svgFrame.empty()
  svgFrame.attr("width", dimensions.width).attr("height", dimensions.height)

  const nb_sides = data.length
  const nb_lvls = 5
  const offset = Math.PI
  const polyangle = (offset * 2) / nb_sides
  const outer_size = 0.65 * squareSize
  const radius = outer_size / 2
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
      `translate(${(dimensions.width - squareSize) / 2}, ${
        (dimensions.height - squareSize) / 2
      })`
    )

  const scale = d3
    .scaleLinear()
    .domain([0, d3.max(data.map((d) => d.value))])
    .range([0, radius])

  const generatePoint = ({ length, angle }) => {
    const point = {
      x: center.x + length * Math.sin(offset - angle),
      y: center.y + length * Math.cos(offset - angle),
    }
    return point
  }

  let points = []
  const length = outer_size / 2
  for (let vertex = 0; vertex < nb_sides; vertex++) {
    const theta = vertex * polyangle
    points.push(generatePoint({ length, angle: theta }))
  }

  const drawPath = (points, parent, color = false) => {
    const lineGenerator = d3
      .line()
      .x((d) => d.x)
      .y((d) => d.y)

    parent
      .append("path")
      .attr("d", lineGenerator(points))
      .attr("stroke", "white")

    if (!color) {
      parent.attr("fill", "transparent")
    }
  }

  const dataset = (data) =>
    data.map((element) => ({ name: element.kindLabel, value: element.value }))

  points = [...points, points[0]]
  drawPath(points, graph)

  const generateGrid = (nb_lvls, nb_sides) => {
    for (let level = 1; level <= nb_lvls; level++) {
      const hyp = (level / nb_lvls) * radius
      const points = []
      for (let vertex = 0; vertex < nb_sides; vertex++) {
        const theta = vertex * polyangle
        points.push(generatePoint({ length: hyp, angle: theta }))
      }
      const group = graph.append("g").attr("class", "levels")
      drawPath([...points, points[0]], group, true)
    }
  }

  const drawData = (dataset, n) => {
    const points = []
    dataset.forEach((d, i) => {
      const len = scale(d.value)
      const theta = i * ((2 * Math.PI) / n)
      points.push({
        ...generatePoint({ length: len, angle: theta }),
        value: d.value,
      })
    })
    const group = graph.append("g").attr("class", "shape")
    drawPath([...points, points[0]], group)
  }

  const drawText = (text, point, isAxis, group) => {
    if (isAxis) {
      const xSpacing = text.toString().includes(".") ? 30 : 22
      group
        .append("text")
        .attr("x", point.x - xSpacing)
        .attr("y", point.y + 5)
        .html(text)
        .style("text-anchor", "middle")
        .attr("fill", "darkgrey")
        .style("font-size", "12px")
        .style("font-family", "sans-serif")
    } else {
      group
        .append("text")
        .attr("x", point.x - (point.x - center.x) * 0.08)
        .attr("y", point.y)
        .html(text)
        .style("text-anchor", "middle")
        .attr("fill", "white")
        .style("font-size", "10px")
        .style("font-family", "sans-serif")
    }
  }

  const drawLabels = (dataset, nb_sides) => {
    const groupL = graph.append("g").attr("class", "radar-labels")
    for (let vertex = 0; vertex < nb_sides; vertex++) {
      const angle = vertex * polyangle
      const label = dataset[vertex].name
      const point = generatePoint({ length: 0.9 * (squareSize / 2), angle })
      drawText(label, point, false, groupL)
    }
  }

  generateGrid(nb_lvls, nb_sides)
  drawData(dataset(data), nb_sides)
  drawLabels(dataset(data), nb_sides)
}

export default drawPerfs

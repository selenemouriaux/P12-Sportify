import * as d3 from 'd3';
import {localeFR} from "../../utils/dateFormats/localeFR";

const drawDailyActivity = (data, ref, dimensions) => {
  // importing local time setup
  d3.timeFormatDefaultLocale(localeFR);
  // formatting date as per defined locale
  const dateFormatter = d3.timeFormat('%a %e')
  // defining amplitude of weights
  const minWeight = d3.min(data.map(d => d.kilogram))
  const maxWeight = d3.max(data.map(d => d.kilogram))
  // setting vertical offset to contain weight variations in the middle of the graph with a minimum value of 1
  const weightOffset = parseInt((maxWeight-minWeight)/2 + 1)
  // defining 'svg' as the outer svg frame of the graph, including graph and both axis
  const svg = d3.select(ref.current)
    .attr("width", dimensions.width
      + dimensions.margin.left + dimensions.margin.right)
    .attr("height", dimensions.height
      + dimensions.margin.top + dimensions.margin.bottom)

  // defining x-axis type & domain/rate ratio, from left to right
  const xScale = d3.scaleBand()
    .domain(data.map(d => dateFormatter(Date.parse(d.day))))
    .range([0, dimensions.width])
    // .padding(0)
    .paddingOuter(1)
    .paddingInner(1)
  // defining y-axis type & domain/rate ratio, from bottom up including offsets for styling
  const yScale = d3.scaleLinear()
    .domain([minWeight-weightOffset, maxWeight+weightOffset])
    .range([dimensions.height, 0])

  // applying horizontal ticks/caption alignment, style and regularity based on previously set xScale
  const xAxis = d3.axisBottom(xScale)
    .tickPadding(20)
    .tickSize(0)
  // applying vertical ticks/caption alignment, style and regularity based on previously set yScale
  const yAxis = d3.axisRight(yScale)
    .tickPadding(20)
    .tickSize(0)
    .ticks(3)

  // appending & placing svg group in dedicated margins to display x-axis info
  svg.append('g')
    .attr("transform", `translate(${dimensions.margin.left}, ${dimensions.height + dimensions.margin.top})`)
    .classed('x axis', true)
    .call(xAxis)

  // appending & placing svg group in dedicated margins to display y-axis info
  svg.append('g')
    .attr("transform", `translate(${dimensions.width + dimensions.margin.left}, ${dimensions.margin.top})`)
    .classed('y axis', true)
    .call(yAxis)

  // creating vertical grid lines
  const yAxisGrid = d3.axisRight(yScale)
    .tickSize(dimensions.width)
    .tickFormat('')
    .ticks(3)
  // appending & placing svg group in dedicated margins to display y-axis grid lines
  svg.append('g')
    .attr("transform", `translate(${dimensions.margin.left}, ${dimensions.margin.top})`)
    .classed('y axis-grid', true)
    .call(yAxisGrid);

  // calling & displaying kilogram data
  const kgBar = svg.append('g')
    .classed('kgBar', true)
    .selectAll('g')
    .data(data)
    .join('g')
    .attr('fill', d => d.kilogram)

  kgBar.selectAll('rect')
    .data(d => d)
    .join('rect')
    .attr('x', d => xScale(d.day))
    .attr('y', d => yScale(d.kilogram))
    .attr('width', xScale.bandwidth())
    .attr('height', d => yScale(d.kilogram))



  // const kCalBar = svg.append('g')
  //   .attr("width", dimensions.width)
  //   .attr("height", dimensions.height)
  //   .attr('transform',
  //     `translate(${dimensions.margin.left}, ${dimensions.margin.top})`)


}

export default drawDailyActivity;

import * as d3 from 'd3';
import {localeFR} from "../../utils/dateFormats/localeFR";
import dailyBar from "../../utils/drawingTypes/dailyBar";

const drawDailyActivity = (data, ref, dimensions) => {
    // importing local time setup
    d3.timeFormatDefaultLocale(localeFR);
    // formatting date as per defined locale
    const dateFormatter = d3.timeFormat('%a%e')
    const date = d3.timeFormat('%e')
    // defining amplitude of weights
    const minWeight = d3.min(data.map(d => d.kilogram))
    const maxWeight = d3.max(data.map(d => d.kilogram))
    // setting vertical offset to contain weight variations in the middle of the graph with a minimum value of 1
    const weightOffset = parseInt((maxWeight - minWeight) / 2 + 1)
    // defining 'svg' as the outer svg frame of the graph, including graph and both axis
    const svg = d3.select(ref.current)
        .attr("width", dimensions.width
            + dimensions.margin.left + dimensions.margin.right)
        .attr("height", dimensions.height
            + dimensions.margin.top + dimensions.margin.bottom)

    const graph = svg.append('g')
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
        .attr('transform', `translate(${dimensions.margin.left}, ${dimensions.margin.top})`)

    // defining x-axis type & domain/rate ratio, from left to right
    const xScale = d3.scaleBand()
        .domain(data.map(d => dateFormatter(Date.parse(d.day))))
        .range([0, dimensions.width])
        .padding(0)
    // .paddingOuter(1)
    // .paddingInner(1)
    // defining y-axis type & domain/rate ratio, from bottom up including offsets for styling
    const yScaleKg = d3.scaleLinear()
        .domain([minWeight - weightOffset, maxWeight + weightOffset])
        .range([dimensions.height, 0])

    // defining y-axis type & domain/rate ratio, from bottom up including offsets for styling
    const yScaleCal = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.calories)])
        .range([dimensions.height, 0])

    // applying horizontal ticks/caption alignment, style and regularity based on previously set xScale
    const xAxis = d3.axisBottom(xScale)
        .tickPadding(20)
        .tickSize(0)
    // applying vertical ticks/caption alignment, style and regularity based on previously set yScaleKg
    const yAxis = d3.axisRight(yScaleKg)
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
    const yAxisGrid = d3.axisRight(yScaleKg)
        .tickSize(dimensions.width)
        .tickFormat('')
        .ticks(3)
    // appending & placing svg group in dedicated margins to display y-axis grid lines
    svg.append('g')
        .attr("transform", `translate(${dimensions.margin.left}, ${dimensions.margin.top})`)
        .classed('y axis-grid', true)
        .call(yAxisGrid);

    // calling & displaying kilogram data
    graph.selectAll('.kgBar')
        .data(data)
        .enter().append('path')
        .attr('class', "kgBar")
        .attr('fill', '#282D30')
        .attr('d', d => dailyBar(
            xScale(dateFormatter(Date.parse(d.day))) + xScale.bandwidth() * .35,
            yScaleKg(d.kilogram),
            xScale.bandwidth()/10,
            dimensions.height -yScaleKg(d.kilogram)
            ))

    // calling & displaying caloric expense data
    graph.selectAll('.kCalBar')
        .data(data)
        .enter().append('path')
        .attr('class', "kCalBar")
        .attr('fill', '#E60000')
        .attr('d', d => dailyBar(
        xScale(dateFormatter(Date.parse(d.day))) + xScale.bandwidth() * .55,
        yScaleCal(d.calories),
        xScale.bandwidth()/10,
        dimensions.height -yScaleCal(d.calories)
    ))



}

export default drawDailyActivity;

import * as d3 from 'd3'
import {useState, useRef, useLayoutEffect} from "react";
import {default as data} from '../../data/user1AverageSession.json'


const D3 = () => {

  const [chartData, setCharData] = useState(data)
  const svgRef = useRef();

  const width = 500;
  const height = 150;
  const padding = 20;
  const maxValue = 60;

  const newData = () => chartData.map((d) => {
      d.sessionLength = Math.floor(
        Math.random() * (maxValue + 1)
      )
      return d;
    }
  )

  useLayoutEffect(() => {
      const xScale = d3.scalePoint()
        .domain(chartData.map((d) => d.day))
        .range([padding, width - padding])

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(chartData, (d) => {
          return d.sessionLength
        })])
        .range([height - padding, padding])

      const line = d3.line()
        .x((d) => xScale(d.day))
        .y((d) => yScale(d.sessionLength))
        .curve(d3.curveMonotoneX)

    d3.select(svgRef.current)
      .select('path')
      .attr('d', () => line(chartData))
      .attr('fill', 'none')
      .attr('stroke', 'purple')

    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    d3.select('#xaxis').remove()
    d3.select(svgRef.current)
      .append('g')
      .attr('transform', `translate(0,${height - padding})`)
      .attr('id', 'xaxis')
      .call(xAxis)

    d3.select('#yaxis').remove()
    d3.select(svgRef.current)
      .append('g')
      .attr('transform', `translate(${padding}, 0)`)
      .attr('id', 'yaxis')
      .call(yAxis)


    }, [chartData]
  )


  return (
    <>
      <h1>D3 graph :</h1>
      <br/>
      <svg id="chart" ref={svgRef} viewBox="0 0 500 150">
        {/*<rect width='500' height='150' fill='blue'/>*/}
        <path d="M50,50 L100,150 " fill="none" stroke="purple" strokeWidth="5"/>
      </svg>
      <p>
        <button type="button" onClick={() => setCharData(newData())}>
          {/*chart data --> {JSON.stringify(chartData)}*/}
          Click to switch to random data
        </button>
      </p>
    </>
  )
}

export default D3;
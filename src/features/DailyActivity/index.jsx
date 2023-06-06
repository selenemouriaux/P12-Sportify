import './style.css'
import * as d3 from 'd3'
import {useRef, useLayoutEffect} from "react";

const DailyActivity = ({dailyData}) => {
  console.log(dailyData)

  const svgRefDaily = useRef();
  const width = 730;
  const height = 225;
  const padding = 20;
  const maxValue = 60;

  useLayoutEffect(() => {
    const xScale = d3.scalePoint()
      .domain(dailyData.map(d => d.day))
      .range([padding, width - padding])

    const yScale = d3.scaleLinear()
      .domain([d3.min(dailyData, d => {
        return d.kilogram-2
      }), d3.max(dailyData, d => {
        return d.kilogram+2
      })])
      .range([height - padding, padding])

    const line = d3.line()
      .x(d => xScale(d.day))
      .y(d => yScale(d.kilogram))
      .curve(d3.curveMonotoneX)

    d3.select(svgRefDaily.current)
      .select('path')
      .attr('d', () => line(dailyData))
      .attr('fill', 'none')
      .attr('stroke', 'purple')

    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    d3.select('#xaxis').remove()
    d3.select(svgRefDaily.current)
      .append('g')
      .attr('transform', `translate(0,${height - padding})`)
      .attr('id', 'xaxis')
      .call(xAxis)

    d3.select('#yaxis').remove()
    d3.select(svgRefDaily.current)
      .append('g')
      .attr('transform', `translate(${padding}, 0)`)
      .attr('id', 'yaxis')
      .call(yAxis)

  }, [dailyData])

  return (
    <div className="dailyActivity chartCard">
      <svg id="dailyChart" ref={svgRefDaily} viewBox="0 0 730 225"/>
      <path d="M50,50 L100,150 " fill="none" stroke="purple" strokeWidth="5"/>
    </div>
  )
}

export default DailyActivity;
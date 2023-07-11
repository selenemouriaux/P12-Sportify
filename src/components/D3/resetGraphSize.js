import * as d3 from "d3";

const resetGraphSize = (ref) => {
  d3.select(ref.current)
    .attr('width', 0)
    .attr('height', 0)
}

export default resetGraphSize
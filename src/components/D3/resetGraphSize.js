import { select } from "d3";

const resetGraphSize = (ref) => {
  select(ref.current)
    .attr('width', 0)
    .attr('height', 0)
}

export default resetGraphSize
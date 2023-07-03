const generateDimensions = (canvas, margins) => {
  const dimensions = {
    width: canvas.current.scrollWidth - margins.left -margins.right,
    height: canvas.current.scrollHeight - margins.top - margins.bottom,
    margin: margins,
  }
  return (dimensions)
}

export default generateDimensions;
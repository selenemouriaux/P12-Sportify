const dailyBar = (x, y, width, height) => {
    const radius = width / 2
    return "M" + (x + radius) + "," + y
        + "h" + (width - 2*radius)
        + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius
        + "v" + (height - 2*radius)
        + "v" + radius
        + "h" + -radius
        + "h" + (2*radius - width)
        + "h" + -radius
        + "v" + -radius
        + "v" + (2*radius - height)
        + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + -radius
        + "z";
}

export default dailyBar;
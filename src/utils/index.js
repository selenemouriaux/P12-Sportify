import { select } from "d3"

export function resetGraphSize(ref) {
  select(ref.current).attr("width", 0).attr("height", 0)
}

export function dailyBar(x, y, width, height) {
  const radius = width / 2
  return (
    "M" +
    (x + radius) +
    "," +
    y +
    "h" +
    (width - 2 * radius) +
    "a" +
    radius +
    "," +
    radius +
    " 0 0 1 " +
    radius +
    "," +
    radius +
    "v" +
    (height - 2 * radius) +
    "v" +
    radius +
    "h" +
    -radius +
    "h" +
    (2 * radius - width) +
    "h" +
    -radius +
    "v" +
    -radius +
    "v" +
    (2 * radius - height) +
    "a" +
    radius +
    "," +
    radius +
    " 0 0 1 " +
    radius +
    "," +
    -radius +
    "z"
  )
}

export function findYatXbyBisection(x, path, error) {
  const bisection_iterations_max = 50
  let length_start = 0,
    length_end = path.getTotalLength(),
    bisection_iterations = 0,
    point = path.getPointAtLength((length_end + length_start) / 2) // get the middle point
  error = error || 0.01

  while (x < point.x - error || x > point.x + error) {
    // get the middle point
    point = path.getPointAtLength((length_end + length_start) / 2)

    if (x < point.x) {
      length_end = (length_start + length_end) / 2
    } else {
      length_start = (length_start + length_end) / 2
    }

    // Increase iteration
    if (bisection_iterations_max < ++bisection_iterations) break
  }
  return point.y
}

export function generateDimensions(canvas, margins) {
  const dimensions = {
    width: canvas.current.scrollWidth - margins.left - margins.right,
    height: canvas.current.scrollHeight - margins.top - margins.bottom,
    margin: margins,
  }
  return dimensions
}

export function formatPerfsData(data) {
  let formattedData = data.data
  return formattedData.map((element) => ({
    ...element,
    kindLabel:
      data.kind[element.kind][0].toUpperCase() +
      data.kind[element.kind].slice(1),
  }))
}

export const localeFR = {
  dateTime: "%-d %B %Y",
  date: "%d.%m.%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"],
  days: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  shortDays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
  months: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  shortMonths: [
    "Jan",
    "Fév",
    "Mars",
    "Avr",
    "Mai",
    "Jui",
    "Juil",
    "Août",
    "Sep",
    "Oct",
    "Nov",
    "Déc",
  ],
}

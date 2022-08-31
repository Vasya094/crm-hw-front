const months2 = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
]

export function currentDate(dateNumber) {
  var date = new Date(dateNumber * 1000)
  var currentDate =
    date.getDate() +
    " " +
    months2[date.getMonth()] +
    " " +
    (date.getFullYear() < 10 ? "0" : "") +
    date.getFullYear()

  return currentDate
}

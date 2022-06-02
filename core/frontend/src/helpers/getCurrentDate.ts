export default function getCurrentDate() {
  const date = new Date()

  const month = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "окттября",
    "ноября",
    "декабря",
  ]

  return `${date.getDate()} ${month[date.getMonth()]} в ${date.getHours()}:${date.getMinutes()}`
}
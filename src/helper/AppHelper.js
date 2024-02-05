import { format, parseISO } from 'date-fns'
import locale from 'date-fns/locale/id' // Import Indonesian locale

function get_year_and_month(dateString) {
  const date = parseISO(dateString)
  return format(date, 'MMMM yyyy', { locale })
}

export function format_period(start, end) {
  return `${get_year_and_month(start)} - ${end ? get_year_and_month(end) : 'sekarang'}`
}

/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
// import moment from 'moment';
import dayjs from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD '

export function formatToDateTime(
  date: dayjs.ConfigType = undefined,
  format = DATE_TIME_FORMAT,
): string {
  return dayjs(date).format(format)
}

export function formatToDate(date: dayjs.ConfigType = undefined, format = DATE_FORMAT): string {
  return dayjs(date).format(format)
}

export const getNeighborDays = (year: number, month: number, flag: string) => {
  let y = year
  let m = month
  if (flag == 'l') {
    y = m == 1 ? y - 1 : y
    m = m == 1 ? 12 : m - 1
  } else {
    y = m == 12 ? y + 1 : y
    m = m == 12 ? 1 : m + 1
  }

  return {
    year: y,
    month: m,
    day: new Date(y, m, 0).getDate(),
  }
}
export const dateUtil = dayjs

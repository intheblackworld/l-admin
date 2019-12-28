import moment from 'moment'
/**
   * 获取本周周一和周日日期
   */
export function getCurrentWeek() {
  const start = moment().weekday(1).format('YYYY-MM-DD') // 本周一
  const end = moment().weekday(7).format('YYYY-MM-DD') // 本周日
  return [start, end]
}
/**
 * 获取前 i 周的周一和周日日期，并以数组的方式返回。
 * 当 i=1，获取的是上周一和上周日的日期；
 * 当 i=2，获取的是上上周一和上上周日的日期
 * ...以此类推
 * @param i
 */
export function getLastWeek(i) {
  const weekOfDay = parseInt(moment().format('E')) // 计算今天是这周第几天
  const last_monday = moment().subtract(weekOfDay + 7 * i - 1, 'days').format('YYYY-MM-DD') // 周一日期
  const last_sunday = moment().subtract(weekOfDay + 7 * (i - 1), 'days').format('YYYY-MM-DD') // 周日日期
  return [last_monday, last_sunday]
}

/**
* 获取后 i 周的周一和周日日期，并以数组的方式返回。
* 当 i=1，获取的是下周一和下周日的日期；
* 当 i=2，获取的是下下周一和下下周日的日期
* ...以此类推
* @param i
*/
export function getNextWeek(i) {
  const weekOfDay = parseInt(moment().format('E')) // 计算今天是这周第几天
  const next_monday = moment().add((7 - weekOfDay) + 7 * (i - 1) + 1, 'days').format('YYYY-MM-DD') // 周一日期
  const next_sunday = moment().add((7 - weekOfDay) + 7 * i, 'days').format('YYYY-MM-DD') // 周日日期
  return [next_monday, next_sunday]
}

// ex
// let currentWeek1 = DateTimeUtils.getCurrentWeek()  // 获取本周开始结束日期
//  let currentWeek2 = DateTimeUtils.getLastWeek(0)  // 获取本周开始结束日期
//  let currentWeek3 = DateTimeUtils.getNextWeek(0)  // 获取本周开始结束日期

//  let lastWeek1 = DateTimeUtils.getLastWeek(1)  // 获取上周开始结束日期
//  let lastWeek2 = DateTimeUtils.getLastWeek(2)  // 获取前两周的那一周即上上周开始结束日期
//  let lastWeek3 = DateTimeUtils.getLastWeek(3)  // 获取前三周的那一周开始结束日期

//  let nextWeek1 = DateTimeUtils.getNextWeek(1)  // 获取下周开始结束日期
//  let nextWeek2 = DateTimeUtils.getNextWeek(2)  // 获取后两周那一周即下下周开始结束日期
//  let nextWeek3 = DateTimeUtils.getNextWeek(3)  // 获取后三周那一周开始结束日期

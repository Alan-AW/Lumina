/**
 * 常用函数
 */
import { MAP_MESSAGE_TITLE, p } from 'contants'

// 获取dateTime
export function getDateTime() {
  const date = new Date()
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  let H = date.getHours()
  let M = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  let S = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  const dateTime = `${y}-${m}-${d} ${H}:${M}:${S}`
  return dateTime
}

// 打开提示面板
export function openNotification(api, type = 'info', content = "") {
  api[type]({
    message: MAP_MESSAGE_TITLE[type],
    description: JSON.stringify(content, null, 2)
  })
}

// 获取任意范围内的随机数
export function getRandomCount(min = 0, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 随机获取一条与上一次不同的诗句
export function randomOnePortry() {
  let lastIndex = -1 // 定义上一次的随机数为-1
  return function () {
    let index = lastIndex
    while (index === lastIndex) {
      index = getRandomCount(0, p.length - 1)
    }
    lastIndex = index
    return p[index]
  }()
}

// 允许过期的localStorage
export const storageThatExpries = {
  /**
   * 设置带有过期时间的localStorage
   * @param key item的key
   * @param value 值
   * @param timer 过期时间支持两种格式，数字和字符串；
   * 数字表示过期时长默认单位为秒，
   * 字符串需要固定格式 时长-单位(以dhms开头均可)
   */
  set: (key, value, timer) => {
    let expriesTimer
    const nowTimer = new Date().getTime()
    if (typeof timer === 'number') {
      expriesTimer = nowTimer + (timer * 1000)
    } else if (typeof timer === 'string') {
      let [duration, unit] = timer.split('-') // 时长，单位
      if (unit === undefined) {
        throw new Error('expries参数格式错误！请使用正确的格式：“时长-单位”')
      }
      if (isNaN(Number(duration))) {
        throw new Error('expries参数格式错误！请使用正确的格式：“数字-单位”')
      }
      let re_duration = Number(duration)  // 时长
      let re_unit = unit.charAt(0).toLowerCase()  // 单位
      const unitPick = ['s', 'm', 'h', 'd']
      if (!unitPick.includes(re_unit)) {
        throw new Error('expries参数格式错误！单位只允许以"s", "m", "h", "d"开头中的一种！')
      }
      const TimerPick = { 's': 1000, 'm': 60 * 1000, 'h': 3600 * 1000, 'd': 86400 * 1000 }
      expriesTimer = nowTimer + TimerPick[re_unit] * re_duration
    } else {
      expriesTimer = nowTimer + 24 * 60 * 60 * 1000
    }
    const store = {
      value, expriesTimer
    }
    localStorage.setItem(key, JSON.stringify(store))
  },
  /**
   * 获取item的值
   * @param key item的key
   * @returns 如果有值且没过期，那么返回item对象，否则返回null
   */
  get: (key) => {
    let data = JSON.parse(localStorage.getItem(key));
    if (data && (!data.expriesTimer || data.expriesTimer > new Date().getTime())) {
      return data.value;
    }
    localStorage.removeItem(key);
    return null;
  },
  /**
   * 删除某个key
   * @param key item的key
   */
  remove: (key) => {
    localStorage.removeItem(key);
  }
}

// 设置sessionStorage
export const sessionStore = {
  set: (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data))
  },
  get: (key) => {
    const store = sessionStorage.getItem(key)
    let result = null
    if (store !== null) {
      result = JSON.parse(store)
    }
    return result
  }
}

// 防抖
export const throttle = (fn, delay) => {
  let timer = null;
  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        fn();
        timer = null;
      }, delay);
    }
  };
}
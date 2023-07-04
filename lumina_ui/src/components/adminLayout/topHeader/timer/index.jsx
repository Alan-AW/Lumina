/**
 * 动态时间显示
 */
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getDateTime } from 'utils'

const Timer = props => {
  const { color } = props
  // 初始化时间
  const [dateTime, setdateTime] = useState('')

  // 读取时间
  useEffect(() => {
    const timer = setInterval(() => {
      const dateTime = getDateTime()
      setdateTime(dateTime)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <span
      style={{
        color,
        fontSize: '16px',
        marginRight: '10px'
      }}
    >{dateTime}</span>
  )
}

const mapStateToProps = state => {
  const { themeConfig: { color } } = state
  return { color }
}

export default connect(mapStateToProps)(Timer)
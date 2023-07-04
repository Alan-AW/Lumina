/**
 * 天气组件
 */
import { useEffect } from 'react'

const Weather = () => {
  useEffect(() => {
    // 初始化和风天气
    window.WIDGET = {
      "CONFIG": {
        "modules": "10234",
        "background": "5",
        "tmpColor": "FF9900",
        "tmpSize": "16",
        "cityColor": "87CFEB",
        "citySize": "16",
        "aqiColor": "EA9999",
        "aqiSize": "16",
        "weatherIconSize": "24",
        "alertIconSize": "18",
        "padding": "10px 10px 10px 10px",
        "shadow": "1",
        "language": "auto",
        "borderRadius": "10",
        "fixed": "false",
        "vertical": "center",
        "horizontal": "center",
        "key": "57dd0702274b491e986c1354549338c8"
      }
    }
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0'
    document.getElementsByTagName('head')[0].appendChild(script)
  }, [])

  return <div id="he-plugin-simple"></div>
}

export default Weather
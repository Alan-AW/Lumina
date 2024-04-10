import { useState } from 'react'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

function HiddenPwd(props) {
  const { text } = props
  const [isShowPwd, setisShowPwd] = useState(false)

  return (
    <div
      onClick={() => setisShowPwd(!isShowPwd)}
      style={{ cursor: 'pointer' }}
    >
      {
        isShowPwd ? <>
          {text}
          <div><EyeInvisibleOutlined /></div>
        </> :
          <EyeOutlined />
      }
    </div>
  )
}

export default HiddenPwd
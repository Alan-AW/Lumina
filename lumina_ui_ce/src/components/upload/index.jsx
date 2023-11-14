/**
 * 全局上传组件
 */
import { useState } from 'react'
import { Upload, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import { allowImgFilesType } from 'contants'


const UploadImg = props => {
  const { api, maxFile = 1, disabled = false, useCrop = false } = props
  // 缩略图文件列表
  const [fileList, setFileList] = useState([])
  // 上传组件配置
  const onPreview = async file => {
    // 预览
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  const onChange = (value) => {
    const { fileList: newFileList } = value
    // 重新选择图片
    setFileList(newFileList)
  }

  const beforeUpload = (file) => {
    // 上传之前
    const isAllowFileType = allowImgFilesType.includes(file.type)
    if (!isAllowFileType) {
      message.error('文件格式错误!')
    }
    const isLt1M = file.size / 1024 / 1024 < 1
    if (!isLt1M) {
      message.error('文件最大不得超过 1MB!')
    }
    return isAllowFileType && isLt1M
  }

  const customRequest = (value) => {
    const { file } = value  // file_list也可以获取到
    setFileList([])
    // 自定义上传
    api({ data: file })
  }

  const uploadProps = {
    multiple: false,
    onChange,  // 显示缩略图图片文件列表
    onPreview,  // 预览上传的图片
    beforeUpload,  // 上传之前的动作
    customRequest,  // 自定义上传
    fileList,  // 文件列表
    maxCount: maxFile,  // 最大文件数
    disabled: disabled  // 是否禁用
  }

  return (
    <>
      {
        useCrop ?
          <ImgCrop>
            <Upload
              {...uploadProps}
              listType="picture-card"
            >
              {fileList.length < maxFile && '+'}
            </Upload>
          </ImgCrop> :
          <Upload
            {...uploadProps}
            listType="picture-card"
          >
            {fileList.length < maxFile && '+'}
          </Upload>
      }
    </>
  )
}

export default UploadImg
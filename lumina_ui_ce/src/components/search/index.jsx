/**
 * 分页顶部的查询面板
 */
import { useMemo } from 'react'
import { Card, Button } from 'antd';
import { SearchOutlined, RedoOutlined } from '@ant-design/icons';
import Pubsub from 'pubsub-js'
import { FADEINUP } from 'contants'

const Search = props => {
  const {
    title = '筛选',
    children,
    submit,
    submitBottomFloat = 'right',
    searchLoading = false
  } = props

  // 点击搜索回调
  const submitClick = () => {
    submit ? submit() : Pubsub.publish('searchOkClick')
  }

  // 取消操作回调
  const cancelSearch = () => {
    if (typeof props.cancelSearch === 'function') {
      props.cancelSearch()
    }
  }

  // 操作按钮浮动方向
  const buttonFloat = useMemo(() => {
    return submitBottomFloat === 'right' ? 'right' : 'left'
  }, [submitBottomFloat])

  return (
    <Card
      title={title}
      style={{
        marginBottom: 'var(--content-margin)',
        minHeight: '140px'
      }}
      className={FADEINUP}
    >
      {children}
      <Button
        disabled={searchLoading}
        loading={searchLoading}
        icon={<RedoOutlined />}
        onClick={cancelSearch}
        style={{
          float: buttonFloat
        }}
      >
        重置
      </Button>
      <Button
        disabled={searchLoading}
        loading={searchLoading}
        type="primary"
        icon={<SearchOutlined />}
        onClick={submitClick}
        style={{
          float: buttonFloat,
          marginRight: 'var(--content-margin)'
        }}
      >
        搜索
      </Button>
    </Card>
  )
}

export default Search
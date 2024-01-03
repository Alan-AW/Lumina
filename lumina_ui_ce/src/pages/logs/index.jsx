import { useState, useEffect, useMemo } from 'react'
import { Table, Tag } from 'antd'
import { getLogs } from 'network/api'
import { FADEIN, pageSize } from 'contants'

function Logs(props) {
  const [params, setparams] = useState({ page: 1 })
  const [tableData, settableData] = useState([])
  const [tableDataCount, settableDataCount] = useState(0)
  const textareaStyle = {
    outline: 'none',
    bordere: 'none',
    height: '50px',
    width: '100%',
    resize: 'none'
  }
  const tableTitle = [
    {
      title: '序号',
      align: 'center',
      render: (row, value, index) => <b>{index + 1}</b>
    },
    {
      title: "ID",
      align: 'center',
      dataIndex: 'id'
    },
    {
      title: "用户名",
      align: 'center',
      dataIndex: 'username'
    },
    {
      title: "用户角色",
      align: 'center',
      dataIndex: 'role'
    },
    {
      title: "数据表",
      align: 'center',
      dataIndex: 'table_name'
    },
    {
      title: "操作指令",
      align: 'center',
      render: (row, value, index) => {
        const colorList = ['#999', 'green', 'blue', 'red']
        return <Tag color={colorList[row.command - 1] || '#999'}>{row.command_label}</Tag>
      }
    },
    {
      title: "修改内容",
      align: 'center',
      dataIndex: 'content',
      render: content => {
        const data = JSON.stringify(content, null, 2)
        return <textarea style={textareaStyle} value={data} readOnly={true} />
      }
    },
    {
      title: "创建时间",
      align: 'center',
      dataIndex: 'create_time'
    },
  ]

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    getLogs(params).then(res => {
      if (res.status) {
        settableData(res.data.results)
        settableDataCount(res.data.count)
      }
    })
  }

  // 分页
  const paginationProps = {
    total: tableDataCount,
    pageSize,
    onChange: page => setparams({ page })
  }

  const table = useMemo(() => (
    <Table
      title={() => '操作日志'}
      className={FADEIN}
      dataSource={tableData}
      columns={tableTitle}
      pagination={paginationProps}
      loading={tableDataCount === 0}
      bordered={true}
      rowKey={item => item.id}
    />
  ), [tableData])

  return (
    <>{table}</>
  )
}

export default Logs
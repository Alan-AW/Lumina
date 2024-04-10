import { useState, useEffect, useMemo } from 'react'
import { Table, Tag } from 'antd'
import { getLogs } from 'network/api'
import { FADEIN, pageSize } from 'contants'
import { useTranslation } from "react-i18next";

function Logs(props) {
  const [params, setparams] = useState({ page: 1 })
  const [tableData, settableData] = useState([])
  const { t, i18n } = useTranslation()
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
      title: t('logs.tableTitle.index'),
      align: 'center',
      render: (row, value, index) => <b>{index + 1}</b>
    },
    {
      title: t('logs.tableTitle.username'),
      align: 'center',
      dataIndex: 'username'
    },
    {
      title: t('logs.tableTitle.role'),
      align: 'center',
      dataIndex: 'role'
    },
    // {
    //   title: t('logs.tableTitle.table_name'),
    //   align: 'center',
    //   dataIndex: 'table_name'
    // },
    {
      title: t('logs.tableTitle.command_label'),
      align: 'center',
      render: (row, value, index) => {
        const colorList = ['#999', 'green', 'blue', 'red']
        return <Tag color={colorList[row.command - 1] || '#999'}>{row.command_label}</Tag>
      }
    },
    {
      title: t('logs.tableTitle.content'),
      align: 'center',
      dataIndex: 'content',
      render: content => {
        const data = JSON.stringify(content, null, 2)
        return <textarea style={textareaStyle} value={data} readOnly={true} />
      }
    },
    {
      title: t('logs.tableTitle.create_time'),
      align: 'center',
      dataIndex: 'create_time'
    },
  ]

  useEffect(() => {
    getData()
  }, [params])

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
      title={() => t('logs.table.title')}
      className={FADEIN}
      dataSource={tableData}
      columns={tableTitle}
      pagination={paginationProps}
      loading={tableDataCount === 0}
      bordered={true}
      rowKey={item => item.id}
    />
  ), [tableData, i18n.language])

  return (
    <>{table}</>
  )
}

export default Logs

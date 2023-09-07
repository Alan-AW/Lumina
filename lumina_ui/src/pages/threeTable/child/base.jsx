import { useEffect, useState, useMemo } from 'react'
import { Table, Button, Popconfirm } from 'antd'
import { useNavigate } from 'react-router-dom'
import { DeleteOutlined, QuestionCircleOutlined, EditOutlined, RollbackOutlined } from '@ant-design/icons'
import { FADEINRIGHT, pageSize } from 'contants'

function Base() {
  const navigate = useNavigate()
  const [params, setparams] = useState({ page: 1 })
  const [tableData, settableData] = useState([
    { id: 1, name_en: 'name_en', name_cn: 'name_cn', description_en: 'description_en', description_cn: 'description_cn' }
  ])
  const [tableDataCount, settableDataCount] = useState(1)
  const tableTitle = [
    {
      title: '序号',
      align: 'center',
      render: (row, value, index) => <b>{index + 1}</b>
    },
    {
      title: 'ID',
      align: 'center',
      dataIndex: 'id'
    },
    {
      title: 'name_en',
      align: 'center',
      dataIndex: 'name_en'
    },
    {
      title: 'name_cn',
      align: 'center',
      dataIndex: 'name_cn'
    },
    {
      title: 'description_en',
      align: 'center',
      dataIndex: 'description_en'
    },
    {
      title: 'description_cn',
      align: 'center',
      dataIndex: 'description_cn'
    },
    {
      title: '操作',
      align: 'center',
      render: row => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <Button
            type='primary'
            shape='circle'
            icon={<EditOutlined />}
            onClick={() => editClick(row)}
          />
          <Popconfirm
            title="删除操作"
            description="确定要删除该行?"
            okText="Yes"
            okType='danger'
            cancelText="No"
            onConfirm={() => deleteRow(row)}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
            <Button
              shape='circle'
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </div>
      )
    }
  ]

  // useEffect(() => {
  //   getBaseData(params).then(res => {
  //     if (res.status) {
  //       settableData(res.data.results)
  //       settableDataCount(res.data.count)
  //     }
  //   }).catch(err => console.log(err))
  // }, [params])

  const deleteRow = row => {
    console.log(row)
  }

  const editClick = row => {
    console.log(row)
  }

  // 分页
  const paginationProps = {
    total: tableDataCount,
    pageSize,
    onChange: page => setparams({ ...params, page })
  }

  // 表格
  const table = useMemo(() => (
    <Table
      className={FADEINRIGHT}
      dataSource={tableData}
      columns={tableTitle}
      pagination={paginationProps}
      loading={tableDataCount === 0}
      bordered={true}
      rowKey={item => item.id}
    />
  ), [tableData])

  return (
    <>
      <Button
        onClick={() => navigate('/phases')}
        icon={<RollbackOutlined />}
        type='primary'
        style={{ marginBottom: 'var(--content-margin)' }}
      >返回上级</Button>
      {table}
    </>
  )
}

export default Base
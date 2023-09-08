import { useEffect, useState, useMemo } from 'react'
import { Table, Button, Popconfirm } from 'antd'
import { useNavigate } from 'react-router-dom'
import { DeleteOutlined, QuestionCircleOutlined, EditOutlined, RollbackOutlined } from '@ant-design/icons'
import { FADEINRIGHT, pageSize } from 'contants'
import { getModels, postModels, patchModels, deleteModels } from 'network/api'

function Models() {
  const navigate = useNavigate()
  const [params, setparams] = useState({ page: 1 })
  const [tableData, settableData] = useState([])
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
      title: 'available_grow_objectives',
      align: 'center',
      dataIndex: 'available_grow_objectives'
    },
    {
      title: 'available_grow_techniques',
      align: 'center',
      dataIndex: 'available_grow_techniques'
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
          <Button
            type='link'
            children='phases→'
            onClick={() => navigate('/phases', { state: { modelsId: row.id } })}
          />
        </div>
      )
    }
  ]

  useEffect(() => {
    getModels(params).then(res => {
      if (res.status) {
        settableData(res.data.results)
        settableDataCount(res.data.count)
      }
    }).catch(err => console.log(err))
  }, [params])

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
        onClick={() => navigate('/cultivars')}
        icon={<RollbackOutlined />}
        type='primary'
        style={{ marginBottom: 'var(--content-margin)' }}
      >返回上级</Button>
      {table}
    </>
  )
}

export default Models
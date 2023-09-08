import { useEffect, useState, useMemo } from 'react'
import { Table, Button, Popconfirm, message, notification } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined, EditOutlined, RollbackOutlined } from '@ant-design/icons'
import { getCultivars, postCultivars, patchCultivars, deleteCultivars } from 'network/api'
import { FADEINRIGHT, pageSize } from 'contants'
import { openNotification } from 'utils/'

function Cultivars() {
  const [api, contextHolder] = notification.useNotification()
  const navigate = useNavigate()
  const { state: { speciesId } } = useLocation()
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
            children='models→'
            onClick={() => navigate('/models', { state: row.id })}
          />
        </div>
      )
    }
  ]
  const [openModal, setopenModal] = useState(false)
  const [editInitValue, seteditInitValue] = useState(null)
  const [isEdit, setisEdit] = useState(false)

  useEffect(() => {
    getCultivars(params).then(res => {
      if (res.status) {
        settableData(res.data.results)
        settableDataCount(res.data.count)
      }
    }).catch(err => console.log(err))
  }, [params])

  // 删除行
  const deleteRow = row => {
    deleteCultivars(row.id).then(res => {
      if (res.status) {
        settableData(tableData.filter(item => item.id !== res.data))
        settableDataCount(tableDataCount - 1)
      } else {
        message.error(res.errs)
      }
    }).catch(err => console.log(err))
  }

  const addClick = () => {
    setisEdit(false)
    setopenModal(true)
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
      {contextHolder}
      <Button
        onClick={() => navigate('/three_table')}
        icon={<RollbackOutlined />}
        type='primary'
        style={{ marginBottom: 'var(--content-margin)' }}
      >返回上级</Button>
      <Button
        type='primary'
        icon={<PlusOutlined />}
        children='添加'
        onClick={addClick}
        style={{ marginBottom: 'var(--content-margin)', marginLeft: 'var(--content-margin)' }}
      />
      {table}
    </>
  )
}

export default Cultivars
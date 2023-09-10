import { useEffect, useState, useMemo } from 'react'
import { Table, Button, Popconfirm, notification, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined, EditOutlined } from '@ant-design/icons'
import ModelsModal from 'components/threeData/modelsModal'
import { FADEINRIGHT, pageSize } from 'contants'
import { getModels, postModels, patchModels, deleteModels } from 'network/api'
import { openNotification } from 'utils'

function Models(props) {
  const { cultivarsId } = props
  const navigate = useNavigate()
  const [api, contextHolder] = notification.useNotification()
  const [params, setparams] = useState({ page: 1 })
  const [tableData, settableData] = useState([])
  const [tableDataCount, settableDataCount] = useState(0)
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
      dataIndex: 'description_cn',
      render: value => <>{Array.isArray(value) ? value.join(',') : value}</>
    },
    {
      title: 'available_grow_objectives',
      align: 'center',
      dataIndex: 'available_grow_objectives',
      render: value => <>{Array.isArray(value) ? value.join(',') : value}</>
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
  const [openModal, setopenModal] = useState(false)
  const [editInitValue, seteditInitValue] = useState(null)
  const [isEdit, setisEdit] = useState(false)

  useEffect(() => {
    getModels(cultivarsId, params).then(res => {
      if (res.status) {
        settableData(res.data.results)
        settableDataCount(res.data.count)
      }
    }).catch(err => console.log(err))
  }, [cultivarsId, params])

  // 删除行
  const deleteRow = row => {
    deleteModels(row.id).then(res => {
      if (res.status) {
        settableData(tableData.filter(item => item.id !== res.data))
        settableDataCount(tableDataCount - 1)
        message.success(res.info)
      } else {
        message.error(res.errs)
      }
    }).catch(err => console.log(err))
  }

  const addClick = () => {
    setisEdit(false)
    setopenModal(true)
  }

  // 点击编辑
  const editClick = row => {
    setisEdit(true)
    seteditInitValue(row)
    setopenModal(true)
  }

  const onOk = value => {
    value.cultivars = cultivarsId
    if (isEdit) {
      patchModels(value.id, value).then(res => {
        if (res.status) {
          settableData(tableData.map(item => {
            if (item.id === res.data.id) {
              item = res.data
            }
            return item
          }))
          message.success(res.info)
          closeModal()
        } else {
          openNotification(api, 'error', res.errs)
        }
      }).catch(err => console.log(err))
    } else {
      delete value.id
      postModels(value).then(res => {
        if (res.status) {
          settableData([res.data, ...tableData])
          settableDataCount(tableDataCount + 1)
          message.success(res.info)
          closeModal()
        } else {
          openNotification(api, 'error', res.errs)
        }
      })
    }
  }

  // 关窗
  const closeModal = () => {
    seteditInitValue(null)
    setopenModal(false)
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
      title={() => 'Models'}
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
        type='primary'
        icon={<PlusOutlined />}
        children='Models'
        onClick={addClick}
        style={{ marginBottom: 'var(--content-margin)' }}
      />
      {table}
      <ModelsModal
        initValue={editInitValue}
        openModal={openModal}
        closeModal={closeModal}
        onOk={onOk}
      />
    </>
  )
}

export default Models
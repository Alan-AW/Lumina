import { useEffect, useState, useMemo } from 'react'
import { Table, Button, Popconfirm, notification, message } from 'antd'
import { DeleteOutlined, QuestionCircleOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import ActionModal from 'components/threeData/actionModal'
import { FADEIN, pageSize } from 'contants'
import { getAction, postAction, patchAction, deleteAction } from 'network/api'
import { openNotification } from 'utils'

function Action(props) {
  const { baseId } = props
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
      title: 'snippet_type',
      align: 'center',
      dataIndex: 'snippet_type'
    },
    {
      title: 'status',
      align: 'center',
      dataIndex: 'status'
    },
    {
      title: 'type',
      align: 'center',
      dataIndex: 'type'
    },
    {
      title: 'hardware',
      align: 'center',
      dataIndex: 'hardware'
    },
    {
      title: 'environmental_factor',
      align: 'center',
      dataIndex: 'environmental_factor'
    },
    {
      title: 'instruction',
      align: 'center',
      dataIndex: 'instruction'
    },
    {
      title: 'value',
      align: 'center',
      dataIndex: 'value'
    },
    {
      title: 'curve',
      align: 'center',
      dataIndex: 'curve'
    },
    {
      title: 'curve_duration',
      align: 'center',
      dataIndex: 'curve_duration'
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
  const [openModal, setopenModal] = useState(false)
  const [editInitValue, seteditInitValue] = useState(null)
  const [isEdit, setisEdit] = useState(false)

  useEffect(() => {
    if (!!baseId) {
      getAction(baseId, params).then(res => {
        if (res.status) {
          settableData(res.data.results)
          settableDataCount(res.data.count)
        } else {
          console.log(res.err)
        }
      }).catch(err => console.log(err))
    }
  }, [baseId, params])

  const deleteRow = row => {
    deleteAction(row.id).then(res => {
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

  const editClick = row => {
    setisEdit(true)
    row.curve_duration = dayjs(row.curve_duration, 'HH:mm:ss')
    seteditInitValue(row)
    setopenModal(true)
  }

  const onOk = value => {
    value.base = baseId
    if (value.instruction !== 'set_value') {
      value.value = ''
    }
    if (isEdit) {
      patchAction(value.id, value).then(res => {
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
      postAction(value).then(res => {
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
      title={() => 'Action'}
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
    <>
      {contextHolder}
      <Button
        type='primary'
        icon={<PlusOutlined />}
        children='Action'
        onClick={addClick}
        disabled={!baseId}
        style={{ marginBottom: 'var(--content-margin)' }}
      />
      {table}
      <ActionModal
        initValue={editInitValue}
        openModal={openModal}
        closeModal={closeModal}
        onOk={onOk}
      />
    </>
  )
}

export default Action
import { useEffect, useState, useMemo } from 'react'
import { Table, Button, Popconfirm, notification, message } from 'antd'
import { DeleteOutlined, QuestionCircleOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import BaseModal from 'components/threeData/baseModal'
import Action from './action'
import { FADEIN, pageSize } from 'contants'
import { getInstruction, postInstruction, patchInstruction, deleteInstruction } from 'network/api'
import { openNotification } from 'utils'

function Base(props) {
  const { phasesId } = props
  const [api, contextHolder] = notification.useNotification()
  const [params, setparams] = useState({ page: 1 })
  const [tableData, settableData] = useState([])
  const [tableDataCount, settableDataCount] = useState(0)
  const [baseId, setbaseId] = useState(null)
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
      title: 'n-weeks',
      align: 'center',
      dataIndex: 'n_weeks'
    },
    {
      title: 'dow',
      align: 'center',
      dataIndex: 'dow'
    },
    {
      title: 'tod',
      align: 'center',
      dataIndex: 'tod'
    },
    {
      title: 'interval',
      align: 'center',
      dataIndex: 'interval'
    },
    {
      title: 'duration',
      align: 'center',
      dataIndex: 'duration'
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
            children='action↓'
            onClick={() => setbaseId(row.id)}
          />
        </div>
      )
    }
  ]
  const [openModal, setopenModal] = useState(false)
  const [editInitValue, seteditInitValue] = useState(null)
  const [isEdit, setisEdit] = useState(false)

  useEffect(() => {
    if (!!phasesId) {
      getInstruction(phasesId, params).then(res => {
        if (res.status) {
          settableData(res.data.results)
          settableDataCount(res.data.count)
        }
      }).catch(err => console.log(err))
    }
  }, [phasesId, params])

  const deleteRow = row => {
    deleteInstruction(row.id).then(res => {
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
    if (row.type === 'timed') {
      row.tod = dayjs(row.tod, 'HH:mm:ss')
    } else {
      row.interval = dayjs(row.interval, 'HH:mm:ss')
      row.duration = dayjs(row.deration, 'HH:mm:ss')
    }
    seteditInitValue(row)
    setopenModal(true)
  }

  const onOk = value => {
    value.phases = phasesId
    if (isEdit) {
      patchInstruction(value.id, value).then(res => {
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
      postInstruction(value).then(res => {
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
      title={() => 'Base'}
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
        children='添加'
        onClick={addClick}
        disabled={!phasesId}
        style={{ marginBottom: 'var(--content-margin)' }}
      />
      {table}
      <BaseModal
        initValue={editInitValue}
        openModal={openModal}
        closeModal={closeModal}
        onOk={onOk}
      />
      <Action baseId={baseId} />
    </>
  )
}

export default Base
import { useEffect, useState, useMemo } from 'react'
import { Table, Button, Popconfirm, message, notification } from 'antd'
import { DeleteOutlined, QuestionCircleOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import TriggersModal from 'components/threeData/triggersModal'
import { FADEIN, pageSize } from 'contants'
import { getTriggers, postTriggers, patchTriggers, deleteTriggers } from 'network/api'
import { openNotification } from 'utils'

function Triggers(props) {
  const { phasesId } = props
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
      title: 'status',
      align: 'center',
      dataIndex: 'status'
    },
    {
      title: 'triggered',
      align: 'center',
      dataIndex: 'triggered',
      render: triggered => triggered ? 'true' : 'false'
    },
    {
      title: 'type',
      align: 'center',
      dataIndex: 'type'
    },
    {
      title: 'metric',
      align: 'center',
      dataIndex: 'metric'
    },
    {
      title: 'operator',
      align: 'center',
      dataIndex: 'operator'
    },
    {
      title: 'threshold',
      align: 'center',
      dataIndex: 'threshold'
    },
    {
      title: 'direction',
      align: 'center',
      dataIndex: 'direction'
    },
    {
      title: 'timeframe',
      align: 'center',
      dataIndex: 'timeframe'
    },
    {
      title: 'toi',
      align: 'center',
      dataIndex: 'toi'
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
    if (!!phasesId) {
      getTriggers(phasesId, params).then(res => {
        if (res.status) {
          settableData(res.data.results)
          settableDataCount(res.data.count)
        }
      }).catch(err => console.log(err))
    }
  }, [phasesId, params])

  const deleteRow = row => {
    deleteTriggers(row.id).then(res => {
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
    row.timeframe = dayjs(row.timeframe, 'HH:mm:ss')
    row.toi = dayjs(row.toi, 'HH:mm:ss')
    seteditInitValue(row)
    setopenModal(true)
  }

  const onOk = value => {
    value.phases = phasesId
    if (isEdit) {
      patchTriggers(value.id, value).then(res => {
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
      postTriggers(value).then(res => {
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
      title={() => 'Triggers'}
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
    <>{contextHolder}
      <Button
        type='primary'
        icon={<PlusOutlined />}
        children='添加'
        onClick={addClick}
        disabled={!phasesId}
        style={{ marginBottom: 'var(--content-margin)' }}
      />
      {table}
      <TriggersModal
        initValue={editInitValue}
        openModal={openModal}
        closeModal={closeModal}
        onOk={onOk}
      />
    </>
  )
}

export default Triggers
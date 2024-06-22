import { useEffect, useState, useMemo } from 'react'
import { Table, Button, Popconfirm, notification, message } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { DeleteOutlined, QuestionCircleOutlined, EditOutlined, PlusOutlined, RollbackOutlined } from '@ant-design/icons'
import PhasesModal from 'components/threeData/phasesModal'
import Triggers from '../child/triggers'
import Base from '../child/base'
import { FADEIN, pageSize } from 'contants'
import { getPhases, postPhases, patchPhases, deletePhases } from 'network/api'
import { openNotification } from 'utils'

function Phases() {
  const { state: { modelsId } } = useLocation()
  const [api, contextHolder] = notification.useNotification()
  const navigate = useNavigate()
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
      title: 'phase_index',
      align: 'center',
      dataIndex: 'phase_index'
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
      title: 'scheduled_events',
      align: 'center',
      dataIndex: 'scheduled_events'
    },
    {
      title: 'ending_condition',
      align: 'center',
      dataIndex: 'ending_condition'
    },
    {
      title: 'ending_triggers',
      align: 'center',
      dataIndex: 'ending_triggers'
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
            children='children↓'
            onClick={() => setphasesId(row.id)}
          />
        </div>
      )
    }
  ]
  const [openModal, setopenModal] = useState(false)
  const [editInitValue, seteditInitValue] = useState(null)
  const [isEdit, setisEdit] = useState(false)
  const [phasesId, setphasesId] = useState(null)

  useEffect(() => {
    if (!!modelsId) {
      getPhases(modelsId, params).then(res => {
        if (res.status) {
          settableData(res.data.results)
          settableDataCount(res.data.count)
        }
      }).catch(err => console.log(err))
    }
  }, [modelsId, params])

  const deleteRow = row => {
    deletePhases(row.id).then(res => {
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
    seteditInitValue(row)
    setopenModal(true)
  }

  const onOk = value => {
    value.f_model = modelsId
    if (isEdit) {
      patchPhases(value.id, value).then(res => {
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
      postPhases(value).then(res => {
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
      title={() => 'Phases'}
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
        icon={<RollbackOutlined />}
        children='返回'
        onClick={() => navigate('/three_table')}
        style={{ marginBottom: 'var(--content-margin)', marginRight: 'var(--content-margin)' }}
      />
      <Button
        type='primary'
        icon={<PlusOutlined />}
        children='Phases'
        onClick={addClick}
        style={{ marginBottom: 'var(--content-margin)' }}
      />
      {table}
      <PhasesModal
        initValue={editInitValue}
        openModal={openModal}
        closeModal={closeModal}
        onOk={onOk}
      />
      <Triggers phasesId={phasesId} />
      <Base phasesId={phasesId} />
    </>
  )
}

export default Phases
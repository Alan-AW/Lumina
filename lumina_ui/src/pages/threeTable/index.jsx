import { useEffect, useState, useMemo } from 'react'
import { Table, Button, Popconfirm, message, notification } from 'antd'
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined, EditOutlined } from '@ant-design/icons'
import SpeciesModal from 'components/threeData/speciesModal'
import Cultivars from './child/cultivars'
import Models from './child/models'
import { FADEIN, pageSize } from 'contants'
import { getSpecies, postSpecies, patchSpecies, deleteSpecies } from 'network/api'
import { openNotification } from 'utils'

function ThreeTable() {
  const [api, contextHolder] = notification.useNotification()
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
            children='cultivars↓'
            onClick={() => {
              setSpeciesId(row.id)
              setshowcultivars(true)
            }}
          />
        </div>
      )
    }
  ]
  const [speciesId, setSpeciesId] = useState(null)
  const [openModal, setopenModal] = useState(false)
  const [editInitValue, seteditInitValue] = useState(null)
  const [isEdit, setisEdit] = useState(false)
  // cultivars
  const [showcultivars, setshowcultivars] = useState(false)
  // models
  const [showModels, setShowModels] = useState(false)
  const [cultivarsId, setcultivarsId] = useState(null)

  // 请求数据
  useEffect(() => {
    getSpecies(params).then(res => {
      if (res.status) {
        settableData(res.data.results)
        settableDataCount(res.data.count)
      }
    }).catch(err => console.log(err))
  }, [params])

  // 删除行
  const deleteRow = row => {
    deleteSpecies(row.id).then(res => {
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

  // 点击编辑
  const editClick = row => {
    setisEdit(true)
    seteditInitValue(row)
    setopenModal(true)
  }

  // 提交
  const onOk = value => {
    if (isEdit) {
      patchSpecies(value.id, value).then(res => {
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
      postSpecies(value).then(res => {
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
        style={{ marginBottom: 'var(--content-margin)' }}
      />
      {table}
      <SpeciesModal
        initValue={editInitValue}
        openModal={openModal}
        closeModal={closeModal}
        onOk={onOk}
      />
      {
        showcultivars && <Cultivars
          speciesId={speciesId}
          nextNode={(rowId) => {
            setcultivarsId(rowId)
            setShowModels(true)
          }}
        />
      }
      {
        showModels && <Models cultivarsId={cultivarsId} />
      }
    </>
  )
}

export default ThreeTable
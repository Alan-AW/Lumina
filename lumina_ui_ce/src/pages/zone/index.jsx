import { useState, useEffect, useMemo } from 'react'
import { Table, notification, Button, message, Popconfirm } from 'antd'
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined, EditOutlined } from '@ant-design/icons'
import { getZone, postZone, patchZone, deleteZone } from 'network/api'
import EditModalForm from 'components/zone/editModal'
import { FADEIN, pageSize } from 'contants'
import { openNotification } from 'utils'
import {useTranslation} from "react-i18next";


function Zone() {
  const [api, contextHolder] = notification.useNotification()
  const  {t} = useTranslation()
  const [params, setparams] = useState({ page: 1 })
  const [tableData, settableData] = useState([])
  const [tableDataCount, settableDataCount] = useState(0)
  const [openModal, setopenModal] = useState(false)
  const [editSate, seteditSate] = useState(false)
  const tableTitle = [
    {
      title: t("Zone.tableTitle.index"),
      align: 'center',
      render: (row, value, index) => <b>{index + 1}</b>
    },
    {
      title:t("Zone.tableTitle.id"),
      align: 'center',
      dataIndex: 'id'
    },
    {
      title:t("Zone.tableTitle.name"),
      align: 'center',
      dataIndex: 'name'
    },
    {
      title:t("Zone.tableTitle.status_label"),
      align: 'center',
      dataIndex: 'status_label'
    },
    {
      title:t("Zone.tableTitle.time_zone"),
      align: 'center',
      dataIndex: 'time_zone'
    },
    {
      title:t("Zone.tableTitle.create_time"),
      align: 'center',
      dataIndex: 'create_time'
    },
    {
      title:t("Zone.tableTitle.update_time"),
      align: 'center',
      dataIndex: 'update_time'
    },
    {
      title:t("Zone.tableTitle.action"),
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
            title={t("Zone.deltitle")}
            description={t("Zone.description")}
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

  useEffect(() => {
    getData()
  }, [params])

  const getData = () => {
    getZone(params).then(res => {
      if (res.status) {
        settableData(res.data.results)
        settableDataCount(res.data.count)
      }
    })
  }

  // 删除回调
  const deleteRow = row => {
    deleteZone(row.id).then(res => {
      if (res.status) {
        settableData(tableData.filter(item => item.id !== res.data))
        message.success(res.info)
      } else {
        message.error(res.errs)
      }
    })
  }

  // 点击添加
  const addClick = () => {
    setopenModal(true)
    seteditSate(false)
  }

  // 点击编辑
  const editClick = row => {
    const { id, status, time_zone, name } = row
    seteditSate(true)
    sessionStorage.setItem('editZoneId', id)
    sessionStorage.setItem('editZoneData', JSON.stringify({ status, time_zone, name }))
    setopenModal(true)
  }

  // 提交
  const onOk = value => {
    if (editSate) {
      const id = sessionStorage.getItem('editZoneId')
      patchZone(id, value).then(res => {
        if (res.status) {
          settableData(tableData.map(item => {
            if (item.id === res.data.id) {
              item = res.data
            }
            return item
          }))
          closeModal()
          message.success(res.info)
        } else {
          openNotification(api, 'error', res.errs)
        }
      })
    } else {
      postZone(value).then(res => {
        if (res.status) {
          settableData([res.data, ...tableData])
          settableDataCount(tableDataCount + 1)
          closeModal()
          message.success(res.info)
        } else {
          openNotification(api, 'error', res.errs)
        }
      })
    }
  }

  // 关窗
  const closeModal = () => {
    sessionStorage.setItem('editZoneData', JSON.stringify({
      status: null, time_zone: '', name: ''
    }))
    setopenModal(false)
  }

  // 分页
  const paginationProps = {
    total: tableDataCount,
    pageSize,
    onChange: page => setparams({ page })
  }

  // 表格
  const table = useMemo(() => (
    <Table
      title={() => t("Zone.title")}
      className={FADEIN}
      dataSource={tableData}
      columns={tableTitle}
      pagination={paginationProps}
      loading={tableDataCount === 0}
      bordered={true}
      rowKey={item => item.id}
    />
  ), [tableData,t])

  return (
    <>
      {contextHolder}
      <Button
        children={t("Zone.addZone")}
        style={{ marginBottom: "var(--content-margin)" }}
        type="primary"
        onClick={addClick}
        icon={<PlusOutlined />}
      />
      {table}
      <EditModalForm
        openModal={openModal}
        closeModal={closeModal}
        onOk={onOk}
        editSate={editSate}
      />
    </>
  )
}

export default Zone
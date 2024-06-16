/**
 * 设备功能列表
 */
import { useState, useEffect, useMemo } from 'react'
import { Table, notification, Button, Popconfirm, message } from 'antd'
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined, EditOutlined } from '@ant-design/icons'
import { FADEIN, pageSize } from 'contants'
import { openNotification } from 'utils'
import { useTranslation } from "react-i18next";
import UnitSetListModal from 'components/unitSetList'
import {
  getSetList,
  postSetList,
  patchSetList,
  deleteSetList
} from 'network/api'

function UnitSetList(props) {
  const [api, contextHolder] = notification.useNotification()
  const [params, setparams] = useState({ page: 1 })
  const [tableData, settableData] = useState([])
  const [tableDataCount, settableDataCount] = useState(0)
  const [openModal, setopenModal] = useState(false)
  const [editSate, seteditSate] = useState(false)
  const [editRow, setEditRow] = useState(null)
  const { t, i18n } = useTranslation()

  const tableTitle = [
    {
      title: t("unitSetList.tableTitle.index"),
      align: 'center',
      render: (row, value, index) => <b>{index + 1}</b>
    },
    {
      title: t("unitSetList.tableTitle.cmd"),
      align: 'center',
      dataIndex: 'cmd'
    },
    {
      title: t("unitSetList.tableTitle.category_cn"),
      align: 'center',
      dataIndex: 'category_cn_label'
    },
    {
      title: t("unitSetList.tableTitle.category_en"),
      align: 'center',
      dataIndex: 'category_en_label'
    },
    {
      title: t("unitSetList.tableTitle.desc_cn"),
      align: 'center',
      dataIndex: 'desc_cn'
    },
    {
      title: t("unitSetList.tableTitle.desc_en"),
      align: 'center',
      dataIndex: 'desc_en'
    },
    {
      title: t("unitSetList.tableTitle.component"),
      align: 'center',
      dataIndex: 'component_name'
    },
    {
      title: t("unitSetList.tableTitle.min_value"),
      align: 'center',
      dataIndex: 'min_value'
    },
    {
      title: t("unitSetList.tableTitle.max_value"),
      align: 'center',
      dataIndex: 'max_value'
    },
    {
      title: t("unitSetList.tableTitle.step"),
      align: 'center',
      dataIndex: 'step'
    },
    {
      title: t("unitSetList.tableTitle.unit_cn"),
      align: 'center',
      dataIndex: 'unit_cn'
    },
    {
      title: t("unitSetList.tableTitle.unit_en"),
      align: 'center',
      dataIndex: 'unit_en'
    },
    {
      title: t("unitSetList.tableTitle.create_time"),
      align: 'center',
      dataIndex: 'create_time'
    },
    {
      title: t("unitSetList.tableTitle.update_time"),
      align: 'center',
      dataIndex: 'update_time'
    },
    {
      title: t("unitSetList.tableTitle.action"),
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
            title={t("unitSetList.DelUnitSet")}
            description={t("unitSetList.DelUnitDES")}
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

  // 查询数据
  const getData = () => {
    getSetList(params).then(res => {
      if (res.status) {
        settableData(res.data.results)
        settableDataCount(res.data.count)
      }
    })
  }

  // 点击添加
  const addClick = () => {
    setopenModal(true)
    setEditRow(null)
    seteditSate(false)
  }

  // 点击编辑
  const editClick = row => {
    setEditRow(row)
    seteditSate(true)
    setopenModal(true)
  }

  // 删除回调
  const deleteRow = row => {
    deleteSetList(row.id).then(res => {
      if (res.status) {
        settableData(tableData.filter(item => item.id !== res.data))
        settableDataCount(tableDataCount - 1)
        message.success(res.info)
      } else {
        message.error(res.errs)
      }
    })
  }

  // 添加
  const postData = data => {
    postSetList(data).then(res => {
      if (res.status) {
        settableData([res.data, ...tableData])
        settableDataCount(tableDataCount + 1)
        message.success(res.info)
        setopenModal(false)
      } else {
        openNotification(api, res.errs)
      }
    })
  }

  // 更新
  const patchData = (id, data) => {
    patchSetList(id, data).then(res => {
      if (res.status) {
        settableData(tableData.map(item => item.id === id ? res.data : item))
        setopenModal(false)
        message.success(res.info)
      } else {
        openNotification(api, res.errs)
      }
    })
  }

  const onOk = value => {
    // 先提取出id
    const { id, ...data } = value
    if (editSate) {
      patchData(id, data)
    } else {
      postData(data)
    }
  }

  // 编辑表单弹窗
  const editModal = useMemo(() => (
    <UnitSetListModal
      openModal={openModal}
      closeModal={() => setopenModal(false)}
      onOk={onOk}
      initValue={editRow}
      editSate={editSate}
    />
  ), [editRow, editSate, openModal])

  // 分页
  const paginationProps = {
    total: tableDataCount,
    pageSize,
    onChange: page => setparams({ page })
  }

  // 表格
  const table = useMemo(() => (
    <Table
      title={() => t('unitSetList.title')}
      className={FADEIN}
      dataSource={tableData}
      columns={tableTitle}
      pagination={paginationProps}
      loading={tableDataCount === 0}
      bordered={true}
      rowKey={item => item.id}
    />
  ), [tableData, i18n.language])

  return (
    <>
      {contextHolder}
      <div className='table-btn'>
        <Button
          onClick={addClick}
          children={t('unitSetList.AddUnitSetList')}
          style={{ marginBottom: "var(--content-margin)" }}
          type='primary'
          icon={<PlusOutlined />}
        />
      </div>
      {table}
      {editModal}
    </>
  )
}

export default UnitSetList
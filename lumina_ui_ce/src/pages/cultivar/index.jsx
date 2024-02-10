/**
 * 品类管理
 */
import { useState, useEffect, useMemo } from 'react'
import { Table, notification, Button, message, Image } from 'antd'
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined, EditOutlined } from '@ant-design/icons'
import { FADEIN, pageSize } from 'contants'
import { getCultvar, postCultvar, patchCultvar, deleteCultvar } from 'network/api'
import { openNotification } from 'utils'
import CultivarEditModal from 'components/cultivar'
import { useTranslation } from "react-i18next";

function Cultivar(props) {
  const [api, contextHolder] = notification.useNotification()
  const [params, setparams] = useState({ page: 1 })
  const [tableData, settableData] = useState([])
  const [tableDataCount, settableDataCount] = useState(0)
  const [openModal, setopenModal] = useState(false)
  const [openUploadModal, setOpenUploadModal] = useState(false)
  const [editSate, seteditSate] = useState(false)
  const [editRow, setEditRow] = useState(null)
  const { t, i18n } = useTranslation()
  const tableTitle = [
    {
      title: t("cultivar.tableTitle.index"),
      align: 'center',
      render: (row, value, index) => <b>{index + 1}</b>
    },
    {
      title: t("cultivar.tableTitle.icon"),
      dataIndex: 'icon',
      align: 'center',
      render: icon => <Image src={icon} height={50} />
    },
    {
      title: t("cultivar.tableTitle.name_cn"),
      dataIndex: 'name_cn',
      align: 'center',
    },
    {
      title: t("cultivar.tableTitle.name_en"),
      dataIndex: 'name_en',
      align: 'center',
    },
    {
      title: t("cultivar.tableTitle.desc_cn"),
      dataIndex: 'desc_cn',
      align: 'center',
    },
    {
      title: t("cultivar.tableTitle.desc_en"),
      dataIndex: 'desc_en',
      align: 'center',
    },
    {
      title: t("cultivar.tableTitle.cycle"),
      dataIndex: 'cycle',
      align: 'center',
    }
  ]

  useEffect(() => {
    getData()
  }, [params])

  // 查询数据
  const getData = () => {
    getCultvar(params).then(res => {
      if (res.status) {
        settableData(res.data.results)
        settableDataCount(res.data.count)
      }
    })
  }

  // 删除回调
  const deleteRow = row => {
    deleteCultvar(row.id).then(res => {
      if (res.status) {
        settableData(tableData.filter(item => item.id !== res.data))
        settableDataCount(tableDataCount - 1)
        message.success(res.info)
      } else {
        message.error(res.errs)
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

  // 弹窗表单提交
  const onOk = value => {
    if (editSate) {
      patchData(editRow.id, value)
    } else {
      postData(value)
    }
  }

  // 添加
  const postData = value => {
    console.log(value)
    postCultvar(value).then(res => {
      if (res.status) {
        settableData([...tableData, res.data])
        settableDataCount(tableDataCount + 1)
        setopenModal(false)
        message.success(res.info)
      } else {
        openNotification(api, 'error', res.errs)
      }
    })
  }

  // 编辑
  const patchData = (id, value) => {
    console.log(id, value)
    patchCultvar(id, value).then(res => {
      if (res.status) {
        settableData(tableData.map(item => item.id === id ? res.data : item))
        setopenModal(false)
        message.success(res.info)
      } else {
        openNotification(api, 'error', res.errs)
      }
    })
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
      title={() => t('cultivar.title')}
      className={FADEIN}
      dataSource={tableData}
      columns={tableTitle}
      pagination={paginationProps}
      loading={tableDataCount === 0}
      bordered={true}
      rowKey={item => item.id}
    />
  ), [tableData, i18n.language])

  // 编辑表单弹窗
  const editModal = useMemo(() => (
    <CultivarEditModal
      openModal={openModal}
      closeModal={() => setopenModal(false)}
      onOk={onOk}
      initValue={editRow}
      editSate={editSate}
    />
  ), [editRow, editSate, openModal])

  return (
    <>
      {contextHolder}
      <Button
        callback={addClick}
        children={t('cultivar.AddCultivar')}
        style={{ marginBottom: "var(--content-margin)" }}
        type='primary'
        icon={<PlusOutlined />}
      />
      {table}
      {editModal}
    </>
  )
}

export default Cultivar
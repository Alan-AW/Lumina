/**
 * 品类管理
 */
import { useState, useEffect, useMemo } from 'react'
import { Table, notification, Button, message, Image, Popconfirm } from 'antd'
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons'
import { FADEIN, pageSize } from 'contants'
import { getCultvar, postCultvar, patchCultvar, deleteCultvar, postCultvarAlgorithm } from 'network/api'
import getBaseUrl from 'network/baseUrl'
import { openNotification } from 'utils'
import CultivarEditModal from 'components/cultivar'
import AlgorithmEditModal from 'components/cultivar/algorithm'
import { useTranslation } from "react-i18next";

function Cultivar(props) {
  const [api, contextHolder] = notification.useNotification()
  const [params, setparams] = useState({ page: 1 })
  const [tableData, settableData] = useState([])
  const [tableDataCount, settableDataCount] = useState(0)
  const [openModal, setopenModal] = useState(false)
  const [openAlgorithmModal, setOpenAlgorithmModal] = useState(false)
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
      width: 300,
      render: icon => <Image src={`${getBaseUrl()}${icon}`} width={200} height={200} />
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
    },
    {
      title: t("cultivar.tableTitle.action"),
      align: 'center',
      render: row => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <Button
            type='primary'
            shape='circle'
            icon={<EditOutlined />}
            onClick={() => editClick(row)}
          />
          <Button
            type='primary'
            shape='circle'
            icon={<SettingOutlined />}
            onClick={() => editAlgorithmClick(row)}
          />
          <Popconfirm
            title={t("cultivar.DelCultivar")}
            description={t("cultivar.DelCultivarDES")}
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
      console.log(res)
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
    setEditRow(null)
    seteditSate(false)
    setopenModal(true)
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
    postCultvar(value).then(res => {
      if (res.status) {
        settableData([res.data, ...tableData])
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

  const editAlgorithmClick = row => {
    setEditRow(row)
    setOpenAlgorithmModal(true)
  }

  // 算法表单提交
  const onAlgorithmOk = value => {
    postCultvarAlgorithm(value).then(res => {
      if (res.status) {
        setOpenAlgorithmModal(false)
        message.success(res.info)
      } else {
        openNotification(api, 'error', res.errs)
      }
    })
  }

  // 分配算法弹窗
  const algorithmModal = useMemo(() => (
    <AlgorithmEditModal
      openModal={openAlgorithmModal}
      closeModal={() => setOpenAlgorithmModal(false)}
      onOk={onAlgorithmOk}
      initValue={editRow}
    />
  ), [editRow, openAlgorithmModal])

  return (
    <>
      {contextHolder}
      <Button
        onClick={addClick}
        children={t('cultivar.AddCultivar')}
        style={{ marginBottom: "var(--content-margin)" }}
        type='primary'
        icon={<PlusOutlined />}
      />
      {table}
      {editModal}
      {algorithmModal}
    </>
  )
}

export default Cultivar
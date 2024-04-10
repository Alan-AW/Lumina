/**
 *  * 算法管理
 */
import { useState, useEffect, useMemo } from 'react'
import { Table, notification, Button, message, Popconfirm } from 'antd'
import { useTranslation } from "react-i18next";
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons'
import { FADEIN, pageSize } from 'contants'
import { openNotification } from 'utils'
import AlgorithmEditModal from 'components/algorithm'
import { getAlgorithm, postAlgorithm, patchAlgorithm, deleteAlgorithm } from 'network/api'

function Algorithm() {
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
      title: t("algorithm.tableTitle.index"),
      align: 'center',
      render: (row, value, index) => <b>{index + 1}</b>
    },
    {
      title: t("algorithm.tableTitle.subject_cn"),
      dataIndex: 'subject_cn',
      align: 'center'
    },
    {
      title: t("algorithm.tableTitle.subject_en"),
      dataIndex: 'subject_en',
      align: 'center'
    },
    {
      title: t("algorithm.tableTitle.title_cn"),
      dataIndex: 'title_cn',
      align: 'center'
    },
    {
      title: t("algorithm.tableTitle.title_en"),
      dataIndex: 'title_en',
      align: 'center'
    },
    {
      title: t("algorithm.tableTitle.desc_cn"),
      dataIndex: 'desc_cn',
      align: 'center'
    },
    {
      title: t("algorithm.tableTitle.desc_en"),
      dataIndex: 'desc_en',
      align: 'center'
    },
    {
      title: t("algorithm.tableTitle.choices_cn"),
      dataIndex: 'choices_cn',
      align: 'center',
      render: value => <>{JSON.stringify(value)}</>
    },
    {
      title: t("algorithm.tableTitle.choices_en"),
      dataIndex: 'choices_en',
      align: 'center',
      render: value => <>{JSON.stringify(value)}</>
    },
    // {
    //   title: t("algorithm.tableTitle.cmd"),
    //   dataIndex: 'cmd',
    //   align: 'center',
    //   render: value => <>{JSON.stringify(value)}</>
    // },
    {
      title: t("algorithm.tableTitle.app_show"),
      dataIndex: 'app_show',
      align: 'center',
      render: value => <>{JSON.stringify(value)}</>
    },
    {
      title: t("algorithm.tableTitle.push"),
      dataIndex: 'push',
      align: 'center',
      render: value => <>{JSON.stringify(value)}</>
    },
    {
      title: t("algorithm.tableTitle.action"),
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
            title={t("algorithm.DelAlgorithm")}
            description={t("algorithm.DelAlgorithmDES")}
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
    getAlgorithm(params).then(res => {
      if (res.status) {
        settableData(res.data.results)
        settableDataCount(res.data.count)
      }
    })
  }

  // 删除回调
  const deleteRow = row => {
    deleteAlgorithm(row.id).then(res => {
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
    postAlgorithm(value).then(res => {
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
    patchAlgorithm(id, value).then(res => {
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
      title={() => t('algorithm.title')}
      className={FADEIN}
      dataSource={tableData}
      columns={tableTitle}
      pagination={paginationProps}
      loading={tableDataCount === 0}
      bordered={true}
      rowKey={item => item.id}
    />
  ), [tableData, i18n.language])

  // 编辑弹窗
  const editModal = useMemo(() => (
    <AlgorithmEditModal
      openModal={openModal}
      initValue={editRow}
      closeModal={() => setopenModal(false)}
      onOk={onOk}
      editSate={editSate}
    />
  ), [openModal, editSate, editRow])

  return (
    <>
      {contextHolder}
      <Button
        onClick={addClick}
        children={t('algorithm.AddAlgorithm')}
        style={{ marginBottom: "var(--content-margin)" }}
        type='primary'
        icon={<PlusOutlined />}
      />
      {table}
      {editModal}
    </>
  )
}

export default Algorithm
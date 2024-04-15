import { useState, useEffect, useMemo } from 'react'
import { Table, notification, Button, message, Popconfirm, Image } from 'antd'
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined, EditOutlined } from '@ant-design/icons'
import { getUser, postUser, patchUser, deleteUser } from 'network/api'
import baseUrl from 'network/baseUrl'
import EditModalForm from 'components/users/editModal'
import HiddenPwd from 'components/users/hiddPwd'
import { FADEIN, pageSize } from 'contants'
import { openNotification } from 'utils'
import { useTranslation } from "react-i18next";

function UserInfo() {
  const [api, contextHolder] = notification.useNotification()
  const [params, setparams] = useState({ page: 1 })
  const [tableData, settableData] = useState([])
  const [tableDataCount, settableDataCount] = useState(0)
  const [openModal, setopenModal] = useState(false)
  const [editSate, seteditSate] = useState(false)
  const [editRow, setEditRow] = useState(null)
  const { t } = useTranslation()
  const tableTitle = [
    {
      title: t("user.tableTitle.index"),
      align: 'center',
      width: 100,
      render: (row, value, index) => <b>{index + 1}</b>
    },
    {
      title: t("user.tableTitle.account"),
      align: 'center',
      dataIndex: 'account'
    },
    {
      title: t("user.tableTitle.password"),
      align: 'center',
      dataIndex: 'password',
      render: pwd => <HiddenPwd text={pwd} />
    },
    // {
    //   title: t("user.tableTitle.company_label"),
    //   align: 'center',
    //   dataIndex: 'company_label'
    // },
    {
      title: t("user.tableTitle.first_name"),
      align: 'center',
      // dataIndex: 'first_name',
      // 如果是全英文名字，将顺序调换
      render: (row, value, index) => `${row.last_name}${row.first_name}`
    },
    // {
    //   title: t("user.tableTitle.last_name"),
    //   align: 'center',
    //   dataIndex: 'last_name'
    // },
    {
      title: t("user.tableTitle.role_label"),
      align: 'center',
      dataIndex: 'role_label'
    },
    {
      title: t("user.tableTitle.status_label"),
      align: 'center',
      dataIndex: 'status_label'
    },
    // {
    //   title: t("user.tableTitle.chinese_label"),
    //   align: 'center',
    //   dataIndex: 'language_label',
    // },
    {
      title: t("user.tableTitle.qrcode_url"),
      align: 'center',
      width: 300,
      dataIndex: 'qrcode_url',
      render: qrcode_url => <Image src={`${baseUrl()}${qrcode_url}`} width={200} />
    },
    {
      title: t("user.tableTitle.create_time"),
      align: 'center',
      dataIndex: 'create_time'
    },
    {
      title: t("user.tableTitle.update_time"),
      align: 'center',
      dataIndex: 'update_time'
    },
    {
      title: t("user.tableTitle.action"),
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
            title={t("user.deltitle")}
            description={t("user.description")}
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
    getUser(params).then(res => {
      if (res.status) {
        settableData(res.data.results)
        settableDataCount(res.data.count)
      }
    })
  }

  // 删除回调
  const deleteRow = row => {
    deleteUser(row.id).then(res => {
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
    setEditRow(null)
    seteditSate(false)
  }

  // 点击编辑
  const editClick = row => {
    setEditRow(row)
    seteditSate(true)
    setopenModal(true)
  }

  // 提交
  const onOk = value => {
    if (editSate) {
      const { id } = value;
      patchUser(id, value).then(res => {
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
      postUser(value).then(res => {
        if (res.status) {
          settableData([res.data, ...tableData])
          settableDataCount(tableDataCount + 1)
          closeModal()
          message.success(res.info)
        } else {
          openNotification(api, 'error', res.errs)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }

  // 关窗
  const closeModal = () => {
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
      title={() => t("user.title")}
      className={FADEIN}
      dataSource={tableData}
      columns={tableTitle}
      pagination={paginationProps}
      loading={tableDataCount === 0}
      bordered={true}
      rowKey={item => item.id}
    />
  ), [tableData, t])

  // 编辑表单弹窗
  const editModal = useMemo(() => (
    <EditModalForm
      openModal={openModal}
      closeModal={closeModal}
      onOk={onOk}
      initValue={editRow}
      editSate={editSate}
    />
  ), [editRow, editSate, openModal])

  return (
    <>
      {contextHolder}
      <Button
        children={t("user.addUser")}
        style={{ marginBottom: "var(--content-margin)" }}
        type="primary"
        onClick={addClick}
        icon={<PlusOutlined />}
      />
      {table}
      {editModal}
    </>
  )
}

export default UserInfo
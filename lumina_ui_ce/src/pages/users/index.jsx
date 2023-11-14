import {useState, useEffect, useMemo} from 'react'
import { Table, notification, Button, message, Popconfirm, Image } from 'antd'
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined, EditOutlined } from '@ant-design/icons'
import { getUser, postUser, patchUser, deleteUser } from 'network/api'
import EditModalForm from 'components/users/editModal'
import { FADEIN, pageSize } from 'contants'
import { openNotification } from 'utils'
import {useTranslation} from "react-i18next";

function UserInfo() {
  const [api, contextHolder] = notification.useNotification()
  const [params, setparams] = useState({ page: 1 })
  const [tableData, settableData] = useState([])
  const [tableDataCount, settableDataCount] = useState(0)
  const [openModal, setopenModal] = useState(false)
  const [editSate, seteditSate] = useState(false)
  const { t } =  useTranslation()
  const tableTitle = [
    {
      title: t("user.tableTitle.index"),
      align: 'center',
      render: (row, value, index) => <b>{index + 1}</b>
    },
    {
      title: t("user.tableTitle.id"),
      align: 'center',
      dataIndex: 'id'
    },
    {
      title:t("user.tableTitle.account"),
      align: 'center',
      dataIndex: 'account'
    },
    {
      title: t("user.tableTitle.password"),
      align: 'center',
      dataIndex: 'password'
    },
    {
      title: t("user.tableTitle.first_name"),
      align: 'center',
      dataIndex: 'first_name'
    },
    {
      title: t("user.tableTitle.last_name"),
      align: 'center',
      dataIndex: 'last_name'
    },
    {
      title: t("user.tableTitle.role_label"),
      align: 'center',
      dataIndex: 'role_label'
    },
    {
      title:t("user.tableTitle.status_label"),
      align: 'center',
      dataIndex: 'status_label'
    },
    {
      title: t("user.tableTitle.chinese_label"),
      align: 'center',
      dataIndex: 'chinese_label',
    },
    {
      title:t("user.tableTitle.qrcode_url"),
      align: 'center',
      dataIndex: 'qrcode_url',
      render: qrcode_url => <Image src={qrcode_url} height={50} />
    },
    {
      title:t("user.tableTitle.avatar_url"),
      align: 'center',
      dataIndex: 'avatar_url',
      render: avatar_url => avatar_url === '' ? '暂无头像' : <Image src={avatar_url} height={50} />
    },
    {
      title:t("user.tableTitle.create_time"),
      align: 'center',
      dataIndex: 'create_time'
    },
    {
      title:t("user.tableTitle.update_time"),
      align: 'center',
      dataIndex: 'update_time'
    },
    {
      title:t("user.tableTitle.action"),
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
    seteditSate(false)
  }

  // 点击编辑
  const editClick = row => {
    const {
      id, account, password, first_name, last_name, role, status, chinese
    } = row
    seteditSate(true)
    sessionStorage.setItem('editUserId', id)
    sessionStorage.setItem('editUserData', JSON.stringify({
      account, password, first_name, last_name, role, status, chinese
    }))
    setopenModal(true)
  }

  // 提交
  const onOk = value => {
    console.log(value)
    if (editSate) {
      const id = sessionStorage.getItem('editUserId')
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
    sessionStorage.setItem('editUserData', JSON.stringify({
      account: '', password: '', first_name: '', last_name: '', role: null, status: null, chinese: null
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
      title={() => t("user.title")}
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
        children={t("user.addUser")}
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

export default UserInfo
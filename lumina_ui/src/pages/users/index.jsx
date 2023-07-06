import { useState, useEffect, useMemo } from 'react'
import { Table, notification, Button, message, Popconfirm, Image } from 'antd'
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined, EditOutlined } from '@ant-design/icons'
import { getUser, postUser, patchUser, deleteUser } from 'network/api'
import EditModalForm from 'components/users/editModal'
import { FADEIN, pageSize } from 'contants'
import { openNotification } from 'utils'

function UserInfo() {
  const [api, contextHolder] = notification.useNotification()
  const [params, setparams] = useState({ page: 1 })
  const [tableData, settableData] = useState([])
  const [tableDataCount, settableDataCount] = useState(0)
  const [openModal, setopenModal] = useState(false)
  const [editSate, seteditSate] = useState(false)
  const tableTitle = [
    {
      title: '序号',
      align: 'center',
      render: (row, value, index) => <b>{index + 1}</b>
    },
    {
      title: 'id',
      align: 'center',
      dataIndex: 'id'
    },
    {
      title: '用户账号',
      align: 'center',
      dataIndex: 'account'
    },
    {
      title: '用户密码',
      align: 'center',
      dataIndex: 'password'
    },
    {
      title: '姓',
      align: 'center',
      dataIndex: 'first_name'
    },
    {
      title: '名',
      align: 'center',
      dataIndex: 'last_name'
    },
    {
      title: '用户角色',
      align: 'center',
      dataIndex: 'role_label'
    },
    {
      title: '用户状态',
      align: 'center',
      dataIndex: 'status_label'
    },
    {
      title: '用户语言',
      align: 'center',
      dataIndex: 'chinese_label',
    },
    {
      title: '二维码',
      align: 'center',
      dataIndex: 'qrcode_url',
      render: qrcode_url => <Image src={qrcode_url} height={50} />
    },
    {
      title: '头像',
      align: 'center',
      dataIndex: 'avatar_url',
      render: avatar_url => avatar_url === '' ? '暂无头像' : <Image src={avatar_url} height={50} />
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'create_time'
    },
    {
      title: '更新时间',
      align: 'center',
      dataIndex: 'update_time'
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
            title="删除用户"
            description="确定要删除这个用户吗?"
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
      title={() => "用户管理"}
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
        children="添加用户"
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
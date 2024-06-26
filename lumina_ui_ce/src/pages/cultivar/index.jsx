/**
 * 品类管理
 */
import { useState, useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { Table, notification, Button, message, Image, Popconfirm, Select } from 'antd'
import {
  PlusOutlined, DeleteOutlined, QuestionCircleOutlined,
  EditOutlined, SettingOutlined, UnorderedListOutlined
} from '@ant-design/icons'
import { FADEIN, pageSize } from 'contants'
import {
  getCultvar, postCultvar, patchCultvar,
  deleteCultvar, postCultvarAlgorithm,
  postCultivarCmd, choicesCompany
} from 'network/api'
import getBaseUrl from 'network/baseUrl'
import { openNotification } from 'utils'
import CultivarEditModal from 'components/cultivar'
import AlgorithmEditModal from 'components/cultivar/algorithm'
import EditCultivarAlgorithm from 'components/cultivar/algorithm/editCultivarAlgorithm'
import PermissionComponent from 'components/permissionButton/permissionComponent'
import { useTranslation } from "react-i18next";

function Cultivar(props) {
  const { userInfo: { role } } = props
  const [api, contextHolder] = notification.useNotification()
  // 很重要的根据公司id查询品类列表
  const [companyId, setCompanyId] = useState(null)
  // 公司列表
  const [companyList, setCompanyList] = useState([])
  const [params, setparams] = useState({ page: 1 })
  const [tableData, settableData] = useState([])
  const [tableDataCount, settableDataCount] = useState(0)
  // 编辑品类弹窗开关
  const [openModal, setopenModal] = useState(false)
  // 分配算法弹窗开关
  const [openAlgorithmModal, setOpenAlgorithmModal] = useState(false)
  // 编辑算法指令集开关
  const [openCultivarCom, setopenCultivarCom] = useState(false)
  const [editSate, seteditSate] = useState(false)
  const [editRow, setEditRow] = useState(null)
  const { t, i18n } = useTranslation()
  let tableTitle = [
    {
      title: t("cultivar.tableTitle.index"),
      align: 'center',
      render: (row, value, index) => <b>{index + 1}</b>
    },
    {
      title: t("cultivar.tableTitle.icon"),
      dataIndex: 'icon',
      align: 'center',
      width: 200,
      render: icon => <Image src={`${getBaseUrl()}${icon}`} width={180} height={180} />
    },
    {
      title: t("cultivar.tableTitle.remark"),
      dataIndex: 'remark',
      align: 'center',
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
          <PermissionComponent allowRoles={['超级管理员']}>
            <Button
              type='primary'
              shape='circle'
              icon={<EditOutlined />}
              onClick={() => editClick(row)}
            />
          </PermissionComponent>
          <PermissionComponent allowRoles={['超级管理员']}>
            <Button
              type='primary'
              shape='circle'
              icon={<SettingOutlined />}
              onClick={() => editAlgorithmClick(row)}
            />
          </PermissionComponent>
          <Button
            type='primary'
            shape='circle'
            icon={<UnorderedListOutlined />}
            onClick={() => cultivarCmdClick(row)}
          />
          <PermissionComponent allowRoles={['超级管理员']}>
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
                danger
                shape='circle'
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </PermissionComponent>
        </div>
      )
    }
  ]
  // 权限控制表格列名称，只有超级管理员才能看到备注信息
  if (role !== '超级管理员') {
    tableTitle = tableTitle.filter(item => item.dataIndex !== 'remark')
  }

  // 获取所有公司下拉框
  useEffect(() => {
    if (role === '超级管理员') {
      choicesCompany().then(res => {
        if (res.status) {
          setCompanyList(res.data)
          setCompanyId(res.data[0]?.value)
        }
      })
    }
  }, [])

  // params改变了，直接发起请求
  useEffect(() => {
    // 如果是超级管理员，且没有选择公司，则不进行查询
    if (role === '超级管理员') {
      if (!companyId) {
        return
      } else {
        getData()
      }
    } else {
      getData()
    }
  }, [params])

  // 切换了公司，那么直接请求该公司的第一页
  useEffect(() => {
    setparams({ company_id: companyId, page: 1 })
  }, [companyId])

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
    onChange: page => setparams({ ...params, page })
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

  // 点击编辑指令集弹窗
  const cultivarCmdClick = row => {
    setEditRow(row)
    setopenCultivarCom(true)
  }

  // 公司管理员对品类指令集提交
  // 24-6-22新增超级管理员也能提交了
  const onCultivarCmdOk = value => {
    postCultivarCmd(editRow.id, value, companyId).then(res => {
      if (res.status) {
        message.success(res.info)
      } else {
        message.error(res.errs)
      }
    }).catch(err => console.log(err))
  }

  // 编辑品类算法指令集弹窗
  const cultivarCmdModal = useMemo(() => (
    <EditCultivarAlgorithm
      openModal={openCultivarCom}
      closeModal={() => setopenCultivarCom(false)}
      onOk={onCultivarCmdOk}
      initValue={editRow}
      companyId={companyId}
    />
  ), [openCultivarCom, editRow, companyId])

  return (
    <>
      {contextHolder}
      <PermissionComponent allowRoles={['超级管理员']}>
        <Button
          onClick={addClick}
          children={t('cultivar.AddCultivar')}
          style={{ marginBottom: "var(--content-margin)" }}
          type='primary'
          icon={<PlusOutlined />}
        />
        <Select
          value={companyId}
          options={companyList}
          onChange={val => setCompanyId(val)}
          style={{ minWidth: '140px', marginLeft: '2rem' }}
          placeholder='请选择查看公司'
        />
      </PermissionComponent>
      {table}
      {editModal}
      {algorithmModal}
      {cultivarCmdModal}
    </>
  )
}

const mapStateToProps = state => {
  const { userInfo } = state
  return { userInfo }
}

export default connect(mapStateToProps, null)(Cultivar)
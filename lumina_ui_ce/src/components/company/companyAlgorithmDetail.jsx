/**
 * 查看企业下的设备和种植周期详情弹窗
 */
import { useState, useEffect } from 'react'
import { Modal, message, Collapse, Tag, Button } from 'antd'
import ReactJson from 'react-json-view'
import { RedoOutlined } from '@ant-design/icons'
import { useTranslation } from "react-i18next";
import { getCompanyUnitDesc, reloadCompanyUnitDesc } from 'network/api'


function CompanyAlgorithmDetail(props) {
  const { openModal, closeModal, companyId } = props
  const { t } = useTranslation()
  const [items, setItems] = useState([])
  const [renderItems, setrenderItems] = useState([])

  useEffect(() => {
    openModal && getData(companyId)
  }, [openModal, companyId])

  useEffect(() => {
    createRenderItems(items)
  }, [items])

  // 获取所有数据列表
  const getData = id => {
    getCompanyUnitDesc(id)
      .then(res => {
        if (res.status) {
          setItems(res.data)
        } else {
          message.error(res.errs)
        }
      })
      .catch(err => console.log(err))
  }

  // 每一行的刷新
  function reloadJson(e, id) {
    e.stopPropagation(); // 阻止点击事件冒泡
    if (!id) return message.error('none data to reload!')
    reloadCompanyUnitDesc(id)
      .then(res => {
        if (res.status) {
          const newItemList = items.map(item => {
            if (item.id === id) {
              item = { ...item, ...res.data }
            }
            return item
          })
          setItems(newItemList)
          message.success('reload success')
        } else {
          message.error('no data')
        }
      })
      .catch(err => console.log(err))
  }

  function createRenderItems(items) {
    const renderItemsData = items.map(item => ({
      key: item.id,
      label: (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 1fr)',
          gridTemplateRows: 'repeat(1, 1fr)',
          placeItems: 'center'
        }}>
          {t('company.unitDesc.serial_number')}: <Tag children={item.serial_number} />
          {t('company.unitDesc.device_id')}: <Tag children={item.device_id} />
          {t('company.unitDesc.cultivar')}: <Tag children={item.cultivar} />
          {t('company.unitDesc.create_time')}: <Tag children={item.create_time} />
          {/* cycle: <Tag children={`${item.sowing_time}/${item.cycle}`} /> */}
          <Button
            type='primary'
            icon={<RedoOutlined />}
            onClick={(e) => reloadJson(e, item.id)}
          />
        </div>
      ),
      children: (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ReactJson
            src={item.unit_cycle}
            name='unit_cycle'
            edit={false}
            enableClipboard={false}
            theme='rjv-default-dark'
            width='100%'
            height='60px'
          />
          <ReactJson
            src={item.unit_queue}
            name='unit_queue'
            edit={false}
            enableClipboard={false}
            theme='rjv-default-dark'
            width='100%'
            height='60px'
          />
        </div>
      )
    }))
    setrenderItems(renderItemsData)
  }

  return (
    <Modal
      open={openModal}
      title={t('company.unitDesc.modaltitle')}
      okText={t("public.button.ok")}
      cancelText={t("public.button.cancel")}
      onCancel={closeModal}
      onOk={closeModal}
      width='80vw'
      // getContainer={false}
      destroyOnClose={true}
    >
      <Collapse accordion items={renderItems} />
    </Modal>
  )
}

export default CompanyAlgorithmDetail
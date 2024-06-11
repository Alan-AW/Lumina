/**
 * 公司管理员编辑品类算法json弹窗
 */
import { useEffect, useState } from 'react';
import { Collapse, Modal, message } from 'antd';
import { useTranslation } from 'react-i18next';
import MonacoEditor from 'react-monaco-editor';
import { getCultivarCmdChoices } from 'network/api'


function EditCultivarAlgorithm(props) {
  const {
    initValue, openModal, closeModal, onOk
  } = props;
  const [items, setItems] = useState([])
  const [editData, seteditData] = useState({})
  const { t } = useTranslation();

  useEffect(() => {
    openModal && getListData(initValue?.id)
  }, [openModal, initValue])

  const getListData = id => {
    getCultivarCmdChoices(id).then(res => {
      createItems(res.data)
      // 备份数据
      let copyDatas = {}
      for (const itm of res.data) {
        copyDatas[`${itm.id}`] = itm.json
      }
      seteditData(copyDatas)
    }).catch(err => console.log(err))
  }

  // 创建折叠面板项
  const createItems = data => {
    setItems(data.map(item => (
      {
        key: item.id,
        label: item.title,
        children: (
          <MonacoEditor
            width={440}
            height={500}
            language='json'
            theme='vs-dark'
            value={JSON.stringify(item.json, null, 2)}
            options={{ selectOnlineNumber: true }}
            onChange={val => handleChange(item.id, item.title, val)}
          />
        )
      }
    )))
  }

  // 确定提交
  const onOkModal = () => {
    onOk(editData)
    closeModal()
  };

  // json数据格式验证
  const validateJsonData = (title = '', data) => {
    let result;
    try {
      result = JSON.parse(data)
    } catch (error) {
      const msg = error.message
      const index = msg.indexOf('line');
      if (index !== -1) {
        const lineNumber = msg.substring(index + 5, msg.indexOf(' ', index + 5));
        const newError = `${title}第 ${lineNumber} 行格式错误！`;
        message.error(newError);
      }
    }
    return result
  }

  // 编辑json回调
  const handleChange = (id, title, val) => {
    const jsonVal = validateJsonData(title, val)
    if (jsonVal) {
      seteditData(editData => ({ ...editData, [`${id}`]: jsonVal }))
    }
  }

  return (
    <Modal
      open={openModal}
      title={t('cultivar.EditAlgorithm')}
      destroyOnClose={true}
      okText='ok'
      cancelText='cancel'
      onCancel={() => closeModal()}
      onOk={onOkModal}
      getContainer={false}
    >
      {
        items.length ? <Collapse accordion ghost={true} items={items} /> : <>暂无数据</>
      }
    </Modal>
  );
}

export default EditCultivarAlgorithm;

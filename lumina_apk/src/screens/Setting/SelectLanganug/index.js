import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import AutoText from 'src/components/AutoView/Text';
import AutoView from 'src/components/AutoView/View';
import { useTranslation } from 'react-i18next';
import { createStyles, useInlineStyle } from 'src/helpers/style';
import { fontName } from 'src/constants/font';
import storage from 'src/helpers/storage';
import colors from 'src/constants/colors';
import ModalSelect from 'src/components/ModalSelect';
import { IconButton } from 'src/components/Button';
import { IconJiantouCopy } from 'src/iconfont';
import { updateRequestLanuage } from 'src/constants/lanaguses';
import { LANGUAGE_CN, LANGUAGE_EN, auth_store } from 'src/store/authStore';

const WINDOW = Dimensions.get('window');

const data = [
  { label: '中文', value: 0 },
  { label: 'English', value: 1 },
];

const DropdownComponent = () => {
  const { t, i18n } = useTranslation();
  const selectRef = useRef(null)

  const [value, setValue] = useState('');
  useEffect(() => {
    storage
    .load({ key: 'language' }).then(lng => {
      const value = lng || LANGUAGE_CN;
      auth_store.language=value;
      i18n.changeLanguage(value);
    })

  }, [])
  function change({value,name}){
    auth_store.language=value;
    // auth_store({
    //   language: value
    // })
    i18n.changeLanguage(value);
    storage.save({
      key: 'language',
      data: value,
    });
    setValue(name);
  }
  return (
    <>
      <AutoText size={28} style={{ paddingRight: 20, paddingTop: 10 }}>
        {t('SelectLanguage')}
      </AutoText>
      <IconButton style={useInlineStyle({ display: 'flex', flexDirection: 'row', alignItems: 'center' })} onPress={() => selectRef.current.openModal()}>
        <AutoText size={28} style={{ paddingTop: 10, color: colors.checked }} >{auth_store.language === 'zh' ? '中文' : 'English'}</AutoText>
      </IconButton>
      <ModalSelect ref={selectRef} data={[{ name: '中文', value: LANGUAGE_CN }, { name: 'English', value: LANGUAGE_EN }]} change={change} />
    </>
  );
};

export default DropdownComponent;

const styles = createStyles({
  container: {
    padding: 16,
  },
  dropdown: {
    height: 60,
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    fontFamily: fontName.regular,
  },
  placeholderStyle: {
    fontSize: 15,
    fontFamily: fontName.medium,
  },
  selectedTextStyle: {
    fontSize: 28,
    lineHeight: 30,
    paddingTop: 5,
    paddingLeft: 10,
    fontFamily: fontName.medium,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

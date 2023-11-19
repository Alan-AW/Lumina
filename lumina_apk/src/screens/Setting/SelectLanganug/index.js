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

const WINDOW = Dimensions.get('window');

const data = [
  { label: '中文', value: 0 },
  { label: 'English', value: 1 },
];

const DropdownComponent = () => {
  const { t, i18n } = useTranslation();
  const selectRef = useRef(null)

  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    storage
      .load({ key: 'language' }).then(lng => {
        const obj = {
          zh: '中文',
          en: 'English',
        }
        if (lng) {
          setValue(obj[lng])
        }

      })
  }, [])
  return (
    <View
      style={useInlineStyle({
        flex: 1,
        marginLeft: 15,
        backgroundColor: '#fff',
        height: WINDOW.height * 2,
        borderRadius: 5,
        marginRight: 15,
      })}>
      <AutoView isRow style={{ paddingLeft: 15, paddingTop: 15 }}>
        <AutoText size={28} style={{ color: '#666', paddingRight: 20, paddingTop: 5 }}>
          {t('SelectLanguage')}:
        </AutoText>
        <IconButton style={useInlineStyle({display: 'flex', flexDirection: 'row',alignItems:'center' })} onPress={() => selectRef.current.openModal()}>
          <AutoText size={28} style={{paddingTop:7}}>{value}</AutoText>
          <IconJiantouCopy size={14} color={'#666'} style={{ transform: [{ rotate: '270deg' }],marginLeft:16 }} />
        </IconButton>
        <ModalSelect ref={selectRef} data={['中文', 'English']} change={(index) => {
          const language = index === 0 ? 'zh' : 'en';
          i18n.changeLanguage(language);
          storage.save({
            key: 'language',
            data: language,
          });
          setValue(index === 0 ? '中文' : 'English');
        }} />
      </AutoView>
    </View>
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
    width: 400,
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

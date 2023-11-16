import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AutoText from 'src/components/AutoView/Text';
import AutoView from 'src/components/AutoView/View';
import {useTranslation} from 'react-i18next';
import {createStyles, useInlineStyle} from 'src/helpers/style';
import {fontName} from 'src/constants/font';
import storage from 'src/helpers/storage';

const WINDOW = Dimensions.get('window');

const data = [
  {label: '中文', value: '1'},
  {label: 'English', value: '2'},
];

const DropdownComponent = () => {
  const {t, i18n} = useTranslation();

  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  useEffect(()=>{
    storage
    .load({key: 'language'}).then(lng=>{
        const obj={
            zh:'1',
            en:'2',
        }
        console.log(lng,'获取语言');
        if(lng){
            setValue(obj[lng])
        }
   
    })
  },[])
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
      <AutoView isRow style={{paddingLeft: 15, paddingTop: 15}}>
        <AutoText size={16} style={{color: '#666', paddingRight: 20}}>
          {t('SelectLanguage')}:{' '}
        </AutoText>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          search={false}
          maxHeight={300}
          labelField="label"
          itemTextStyle={useInlineStyle({
            fontSize: 15,
            fontFamily: fontName.medium,
          })}
          fontFamily={fontName.medium}
          valueField="value"
          placeholder={t('SelectLanguage')}
          value={value}
          //   onFocus={() => setIsFocus(true)}
          //   onBlur={() => setIsFocus(false)}
          onChange={item => {
            if (item.value == 1 || item.value == 2) {
                const language = item.value==1?'zh':'en';
              i18n.changeLanguage(language);
              storage.save({
                key: 'language',
                data: language,
              });
            }
            
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => null}
        />
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
    height: 50,
    borderColor: '#f4f4f4',
    borderWidth: 0.5,
    borderRadius: 8,
    width: 200,
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
    fontSize: 16,
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

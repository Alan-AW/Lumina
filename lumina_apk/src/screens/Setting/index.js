import React from 'react';
import AutoView from 'src/components/AutoView/View';
import SelectLanguage from './SelectLanganug';
import ViewContainer from 'src/components/ViewContainer';
import {IconButton} from 'src/components/Button';
import AutoText from 'src/components/AutoView/Text';
import ShadowCard from 'src/components/Shadow';
import {Alert} from 'react-native';
import storage from 'src/helpers/storage';
import { useTranslation } from 'react-i18next';

const Setting = ({navigation}) => {
  const { t } = useTranslation();
  function loginOut() {
    Alert.alert(
      t('confirmTitle'),
      '',
      [
        // {text: '自定义按钮', onPress: () => console.log('点击了自定义按钮')},
        {
          text: t('cancel'),
          onPress: () => console.log('点击了取消按钮'),
          style: 'cancel',
        },
        {
          text: t('confirm'),
          onPress: () => {
            storage.remove({
              key: 'userInfo',
            });
            navigation.reset({
              index: 1,
              routes: [{name: 'Login'}],
            });
          },
        },
      ],
      {cancelable: false},
    );
  }
  return (
    <ViewContainer style={{flex: 1}}>
      <AutoView isRow>
        <SelectLanguage />
      </AutoView>
      <AutoView style={{paddingLeft: 20, marginTop: 32}} isRow>
        <ShadowCard>
          <IconButton
            onPress={() => loginOut()}
            style={{
              padding: 10,
              borderColor: '#f4f4f4',
              borderWidth: 1,
              borderRadius: 10,
            }}>
            <AutoText style={{lineHeight:40}} size={24}>{t('logOutOfLogin')}</AutoText>
          </IconButton>
        </ShadowCard>
      </AutoView>
    </ViewContainer>
  );
};

export default Setting;

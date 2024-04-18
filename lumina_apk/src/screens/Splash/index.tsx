import React from 'react';
import { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import { createStyles } from 'src/helpers/style';
import { useAppDispatch, useAppSelector } from 'src/reduxCenter/hooks';
import DialogServer from 'src/helpers/modal';
import storage from 'src/helpers/storage';
import Login from '../Login';
import { loginInSuccess, updateMenuStatus } from 'src/reduxCenter/actionCreators';
import { LANGUAGE_EN, auth_store } from 'src/store/authStore';
import { useTranslation } from 'react-i18next';
import { getAppVersion } from 'src/apis/home';
import { HEIGHT, WIDTH, isUpgradeRequired } from 'src/constants/global';
import { updateApp } from 'src/helpers/utils';
import { checkUpdate } from 'src/utils';
import Center from 'src/components/FlexView/Center';
import AutoText from 'src/components/AutoView/Text';

export default function Splash(props: any) {
  const dispatch = useAppDispatch()

  const { t, i18n } = useTranslation();
  const { checkedVersion } = auth_store;


  useEffect(() => {
    //Orientation.lockToLandscapeLeft()

    storage
      .load({ key: 'language' }).then(lng => {
        i18n.changeLanguage(lng || LANGUAGE_EN);
      })
    initAuth();


  }, [])



  function initAuth() {
    dispatch(updateMenuStatus(true))
    storage.load({ key: 'userInfo' }).then(userInfo => {
      if (userInfo) {
        auth_store({ token: userInfo.token })
        dispatch(loginInSuccess(userInfo))
        checkUpdate((data: any) => {
          props.navigation.navigate('UpdateApp', data);
          dispatch(updateMenuStatus(true))

        }, () => {
          props.navigation.navigate('Home');
          dispatch(updateMenuStatus(false))


        })
      } else {
        goLogin()
      }
    }).catch(Err => {
      console.log('错误', Err);
      goLogin()

    });

  }


  function goHome() {
    props.navigation.navigate('Home');
  }
  function goLogin() {
    props.navigation.navigate('Login');
  }





  return <Center style={{ position: 'absolute', left: 0, top: 0, width: WIDTH, height: HEIGHT }}>



  </Center>;
}

const styles = createStyles({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

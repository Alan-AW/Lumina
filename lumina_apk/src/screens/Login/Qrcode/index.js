import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, View} from 'react-native';
import {
  useCodeScanner,
  Camera,
  useCameraDevice,
} from 'react-native-vision-camera';
import {requestLogin} from 'src/apis/login';
import {useAppDispatch} from 'src/reduxCenter/hooks';
import storage from 'src/helpers/storage';
import {loginInSuccess, updateMenuStatus} from 'src/reduxCenter/actionCreators';
import {createStyles} from 'src/helpers/style';
import AutoText from 'src/components/AutoView/Text';
import AutoView from 'src/components/AutoView/View';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Orientation from 'react-native-orientation-locker';
import ScanScreen from './ScanScreen';
import ToastService from 'src/helpers/toast';

const QrCode = props => {
  const [isActive, setIsActive] = useState(true);
  const [info, setInfo] = useState(null);
  const translateY = useSharedValue(0);
  const nav = useNavigation();
  const dispatch = useAppDispatch();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    dispatch(updateMenuStatus(true));
    // Orientation.lockToPortrait();
    // translateY.value = withRepeat(
    //   withTiming(800, { duration: 5000 }),
    //   0,
    //   true
    // );
  }, []);
  //处理扫码后的登录
  useEffect(() => {
    if (info) {
      requestLogin(info).then(res => {
        if (res && !res.status) {
          ToastService.showToast(res.errs)
          setInfo(null);
          return;
        }
        setIsActive(false);
        storage.save({
          key: 'userInfo',
          data: res.data,
        });
        dispatch(loginInSuccess(res.data));
        dispatch(updateMenuStatus(false));
        nav.navigate('Home');
      });
    }
  }, [info]);

  const device = useCameraDevice('back');
  if (device == null) {
    return null;
  }
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (!info) {
        const item = codes.find(i => !!JSON.parse(i.value).qrcode);
        if (item) {
          setInfo(JSON.parse(item.value));
        }
      }
    },
  });

  return (
    <>
      <Camera
        style={{flex: 1}}
        {...props}
        isActive={isActive}
        device={device}
        codeScanner={codeScanner}
      />
      <AutoView
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 100,
          zIndex: 99,
          width:'100%',
          height:'100%'
        }}>
        <ScanScreen />
      </AutoView>
    </>
  );
};

const styles = createStyles({
  scanLine: {
    height: 10,
    width: '100%',
  },
});

export default QrCode;

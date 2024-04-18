import { Alert, ToastAndroid } from "react-native";
import { getAppVersion } from "src/apis/home";
import { isUpgradeRequired } from "src/constants/global";
import { updateApp } from "src/helpers/utils";
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';


export function numberToFixed(value: number, length: number) {
  if (value > 0) {
    return parseFloat(value.toFixed(length));
  }
  return 0;
}

export function deepData(obj: any) {
  return JSON.parse(JSON.stringify(obj))
}


export function checkUpdate(callback:Function,noUpdate:Function) {
  ToastAndroid.show('检查版本更新...', ToastAndroid.SHORT);
  getAppVersion().then(res => {
    console.log(res, '获取的更新数据');
    const { version, apk } = res.data;
    if (isUpgradeRequired(version)) {
      ToastAndroid.show('版本需要更新...', ToastAndroid.SHORT);
      Alert.alert('提示', '版本需要更新',
        [
          { text: '取消',onPress:()=>{
            noUpdate()
          } },
          {
            text: '更新', onPress: () => {
              callback({update_version:version,url:apk})
            }
          }
        ]
      )
      return;
    }
    noUpdate();
  }).catch(err => {
    console.log(err, '错误信息');
    noUpdate();
    ToastAndroid.show('检查版本更新失败', ToastAndroid.SHORT);
  })
}

export function checkDevicesAuth(){
  check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(res=>{
    console.log(res,'外部存储权限');
    if(res!==RESULTS.GRANTED){
      //请求权限
      request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(res=>{
        console.log(res,'请求权限');
        if(res!==RESULTS.GRANTED){
          ToastAndroid.show('外部存储权限请求失败',ToastAndroid.SHORT);
        }
      })
    }
    
  })

}
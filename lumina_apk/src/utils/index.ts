import { Alert, ToastAndroid } from "react-native";
import { getAppVersion } from "src/apis/home";
import { isUpgradeRequired } from "src/constants/global";
import { updateApp } from "src/helpers/utils";
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import {getAppVersionName, getAppVersionAsync} from 'src/helpers/app';


export function numberToFixed(value: number, length: number) {
  if (value > 0) {
    return parseFloat(value.toFixed(length));
  }
  return 0;
}
export function valueToFixed(value:number,length:number){
  return Number(value.toFixed(length))
}

export function deepData(obj: any) {
  return JSON.parse(JSON.stringify(obj))
}


export function checkUpdate(callback: Function, noUpdate: Function) {
  ToastAndroid.show('检查版本更新...', ToastAndroid.SHORT);
  getAppVersion().then(res => {
    console.log(res, '获取的更新数据');
    const { version, apk } = res.data;

    getAppVersionName((appVersion:string) => {
      console.log('当前版本号', appVersion);
      // 将版本号字符串分割成数组
      const currentVersionParts = appVersion.split('.');
      const requiredVersionParts = version.split('.');
  
      // 将版本号转换成整数，确保比较时不会出现意外行为
      const currentMajor = parseInt(currentVersionParts[0]);
      const currentMinor = parseInt(currentVersionParts[1]);
      const currentPatch = parseInt(currentVersionParts[2]);
  
      const requiredMajor = parseInt(requiredVersionParts[0]);
      const requiredMinor = parseInt(requiredVersionParts[1]);
      const requiredPatch = parseInt(requiredVersionParts[2]);
  
      // 检查主版本号、次版本号和修订号
      if (
        currentMajor < requiredMajor ||
        currentMinor < requiredMinor ||
        currentPatch < requiredPatch
      ) {
        callback({ update_version: version, url: apk })
      }else{
        noUpdate();
      }
    });
   
  }).catch(err => {
    console.log(err, '错误信息');
    // noUpdate();
    ToastAndroid.show('检查版本更新失败', ToastAndroid.SHORT);
  })
}

export function checkDevicesAuth() {
  check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(res => {
    console.log(res, '外部存储权限');
    if (res !== RESULTS.GRANTED) {
      //请求权限
      request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(res => {
        console.log(res, '请求权限');
        if (res !== RESULTS.GRANTED) {
          ToastAndroid.show('外部存储权限请求失败', ToastAndroid.SHORT);
        }
      })
    }

  })

}


/**
 * 对象数组去重
 */

export const arrRepeat = (data: any[], key: string) => {
  const arr = [];
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    let isRepeat:boolean=false;
    for (let _index = 0; _index < data.length; _index++) {
      const _item = data[_index];
      if (item[key] === _item[key]) {
        isRepeat=true;
        break;
      }

    }
    if(!isRepeat){
      arr.push(item)
    }

  }
  return arr;

}
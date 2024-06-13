import { Alert, ToastAndroid } from "react-native";
import { getAppVersion } from "src/apis/home";
import { isUpgradeRequired } from "src/constants/global";
import { updateApp } from "src/helpers/utils";
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';


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
    if (isUpgradeRequired(version)) {
      // ToastAndroid.show('版本需要更新...', ToastAndroid.SHORT);
      console.log(res.data, '数据');

      callback({ update_version: version, url: apk })
      // Alert.alert('提示', '版本需要更新',
      //   [
      //     { text: '取消',onPress:()=>{
      //       noUpdate()
      //     } },
      //     {
      //       text: '更新', onPress: () => {
      //         callback({update_version:version,url:apk})
      //       }
      //     }
      //   ]
      // )
      return;
    }
    noUpdate();
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
// function forEach(array: any, iteratee: (value: any, key: number) => void) {
//   let index = -1;
//   const length = array.length;
//   while (++index < length) {
//     iteratee(array[index], index);
//   }
//   return array;
// }

import { Alert, ToastAndroid } from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import { baseUrl } from "src/apis/config";
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions'
import RNFS from 'react-native-fs'

// export function deepClone(target: any, map = new WeakMap()) {
//   if (typeof target === "object") {
//     const isArray = Array.isArray(target);

//     let cloneTarget: any = isArray ? [] : {};

//     if (map.get(target)) {
//       return map.get(target);
//     }
//     map.set(target, cloneTarget);

//     const keys = isArray ? undefined : Object.keys(target);
//     if (keys) {
//       forEach(keys || target, (value, key) => {
//         if (keys) key = value;
//         cloneTarget[key] = deepClone(target[key], map);
//       });
//     }

//     return cloneTarget;
//   }

//   return target;
// }

// 判断JSON是否为空
export function jsonIsEmpty(json: Record<string, any>) {
  return JSON.stringify(json) === "{}" || Object.keys(json).length === 0;
}

// 获取JSON序列化字符串
export function jsonSerialize(json: Record<string, string | number | null>): string {
  if (jsonIsEmpty(json)) return "";

  const searchParams = new URLSearchParams();
  for (let key in json) {
    searchParams.append(key, json[key] ? (json[key] as string) : "");
  }
  return searchParams.toString();
}

// 深度合并
// export function deepMerge(...json: Record<string, any>[]) {}

export function getMonth() {
  const months: any = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };
  return months[new Date().getMonth() + 1]

}

export function GetPercent(num: any, total: any) {
  num = parseFloat(num);
  total = parseFloat(total);
  if (isNaN(num) || isNaN(total)) {
    return "-";
  }
  return total <= 0 ? 0 : (Math.round(num / total * 10000) / 100.00);
}

export const updateApp = (url: any, version: string) => {
  let dirs = RNFetchBlob.fs.dirs;
  const appVersion = `LuminaOS_${version}.apk`
  const path = `${RNFS.ExternalStorageDirectoryPath}/Download/DLManager`;

  RNFS.readDir(path).then(res => {
    if (res && Array.isArray(res)) {
      const fileList = res.filter(i => i.isFile() && i.name === appVersion)
      console.log(res,fileList, '获取的路径');

      if (fileList.length > 0) {
        const installPath = fileList[0].path;
        console.log('已找到下载的版本，进行安装' + fileList[0].path);
        console.log('直接安装');
        RNFetchBlob.android.actionViewIntent(
          installPath,
          'application/vnd.android.package-archive'
        );


      } else {
        console.log('开始下载');
        
        downLoadApp(appVersion, url)
      }

    }
  }).catch(err =>{
    ToastAndroid.show('检查更新失败',ToastAndroid.SHORT)

  })
}


export function downLoadApp(appVersion: string, url: string) {
  const path = `${RNFS.ExternalStorageDirectoryPath}/Download/DLManager/${appVersion}`;
  ToastAndroid.show('正在下载...', ToastAndroid.SHORT)
  RNFetchBlob.config({
    fileCache: true,
    path,
    addAndroidDownloads: {
      useDownloadManager: true,
      title: appVersion,
      description: "An APK that will be installed",
      mime: 'application/vnd.android.package-archive',
      mediaScannable: true,
      path,
      notification: true,
    },
  })
    .fetch("GET", `${baseUrl}${url}`)
    .then((res) => {
      console.log('下载完成的路径1', res, res.path());
      ///storage/emulated/0/Download/LuminaOS_1.0.1.apk
      RNFetchBlob.android.actionViewIntent(
        res.path(),
        'application/vnd.android.package-archive'
      );


    }).catch(err => {
      console.log(err,'下载失败');
      
      Alert.alert('提示', '下载失败')
    });
}


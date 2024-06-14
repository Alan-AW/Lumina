import {Dimensions} from 'react-native';
import RNFS from 'react-native-fs';
import {getAppVersionName, getAppVersionAsync} from 'src/helpers/app';
export const HEIGHT = Dimensions.get('screen').height;
export const WIDTH = Dimensions.get('screen').width;


export function isUpgradeRequired(requiredVersion: string) {
  let updateStatus = false;
  getAppVersionName(appVersion => {
    console.log('当前版本号', appVersion);
    // 将版本号字符串分割成数组
    const currentVersionParts = appVersion.split('.');
    const requiredVersionParts = requiredVersion.split('.');

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
      updateStatus = true;
    }
  });

  return updateStatus;
}

export const CACHE_PATH = RNFS.CachesDirectoryPath;
export const ORIGIN_PATH = 'file://';

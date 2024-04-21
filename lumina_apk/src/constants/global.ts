import {Dimensions} from 'react-native';
import RNFS from 'react-native-fs'
export const HEIGHT=Dimensions.get('screen').height
export const WIDTH=Dimensions.get('screen').width



export const APP_VERSION='1.0.0'



export function isUpgradeRequired( requiredVersion:string) {
    // 将版本号字符串分割成数组
    const currentVersionParts = APP_VERSION.split('.');
    const requiredVersionParts = requiredVersion.split('.');

    // 将版本号转换成整数，确保比较时不会出现意外行为
    const currentMajor = parseInt(currentVersionParts[0]);
    const currentMinor = parseInt(currentVersionParts[1]);
    const currentPatch = parseInt(currentVersionParts[2]);

    const requiredMajor = parseInt(requiredVersionParts[0]);
    const requiredMinor = parseInt(requiredVersionParts[1]);
    const requiredPatch = parseInt(requiredVersionParts[2]);

    // 检查主版本号、次版本号和修订号
    if (currentMajor < requiredMajor || currentMinor < requiredMinor || currentPatch < requiredPatch) {
        return true;
    }

    return false;
}


export const CACHE_PATH=RNFS.CachesDirectoryPath;
export const ORIGIN_PATH='file://';


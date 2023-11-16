import { Alert, PermissionsAndroid, Platform } from "react-native";

/**
 * 判断是否拥有相册权限
 * @param {*} callback 检查后存在权限的回调
 * @returns 
 */
export async function isAlbumAuth(callback?:Function) {
    if (Platform.OS === "android" && !(await checkGetPhotoAndVideoAuth())) {
        return;
    }
    if(callback && typeof callback==='function'){
        callback()
    }
   
}

export async function checkGetPhotoAndVideoAuth() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
        return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
}
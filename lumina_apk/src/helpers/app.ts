import { NativeModules } from 'react-native';



export  function getAppVersionName(callback:(version:string)=>void){
    NativeModules.PackageInfoModule.getAppVersion().then((res:string)=>{
        callback(res)
    }).catch((err:any)=>{
        console.log(err);
    })
}

export async function getAppVersionAsync(){

    try {
        return await NativeModules.PackageInfoModule.getAppVersion()
        
    } catch (error) {
        return ''
    }
}
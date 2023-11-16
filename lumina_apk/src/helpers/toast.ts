import { NativeModules } from 'react-native';


function showToast(text:string,duration?:number){
    NativeModules.ToastExample.show(text,duration || 3000)
}

const ToastService={
    showToast,
}
export default ToastService
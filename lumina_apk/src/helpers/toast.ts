import { NativeModules } from 'react-native';
import {useTranslation} from 'react-i18next'


function showToast(text:string,duration?:number){
    const {t}=useTranslation()
    NativeModules.ToastExample.show(t(text),duration || 3000)
}

const ToastService={
    showToast,
}
export default ToastService
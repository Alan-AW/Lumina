import { NativeModules } from 'react-native';
import { useTranslation } from 'react-i18next'
import zh from '../../locales/zh-cn.json'
import en from '../../locales/en-us.json'
import storage from './storage';

const _zh: any = zh;
const _en: any = en;

async function showToast(key: string, duration?: number) {
    const language = await storage.load({ key: 'language' });
    const obj: any = {
        zh: _zh[key],
        en: _en[key],
    }
    NativeModules.ToastExample.show(obj[language], duration || 3000)
}

const ToastService = {
    showToast,
}
export default ToastService
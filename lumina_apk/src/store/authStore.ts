//存放用户的信息以及token
import resso from "resso";

export const LANGUAGE_EN = 'en';
export const LANGUAGE_CN = 'zh';

type authStoreType = {
    //当前选择的语言
    language: string
    token: string,
}


export const auth_store = resso<authStoreType>({
    language: LANGUAGE_EN,
    token: '',
})

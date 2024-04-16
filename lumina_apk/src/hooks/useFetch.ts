

import React, { useEffect } from "react";
import { ToastAndroid } from "react-native";
import { locales } from "src/helpers/localesText";


type useFetchConfigProps = {
    //是否屏幕聚焦重新请求
    focus?: boolean;
}


export const useFetch = (fetch: Function, config?: useFetchConfigProps) => {


    //缓存传入的函数
    //声明state
    const [data, setData] = React.useState<any>(null);
    //声明loading
    const [loading, setLoading] = React.useState<boolean>(false);

    async function cacheFetch(callback?:Function) {
        try {
            console.log('开始请求数据');

            // setLoading(true)
            const res = await fetch();
            console.log('请求数据',res);
            
            if (res.code === 200 && !res.errs) {
                setData(res.data)
                callback?.(res.data)
            } else {
                ToastAndroid.show(res.errs, ToastAndroid.SHORT)
            }
            setLoading(false)
            //内部处理错误

        } catch (error) {
            console.log(error,'请求错误');
            
            setLoading(false)

        }

    }


    return {
        run:cacheFetch,
        loading,
        data,

    }


}
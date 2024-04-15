

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

    async function cacheFetch(callback:Function) {
        try {
            setLoading(true)
            const res = await fetch();
            if (res.code === 200 && !res.errs) {
                setData(res.data)
                callback(res.data)
            } else {
                ToastAndroid.show(res.errs, ToastAndroid.SHORT)
            }
            setLoading(false)
            //内部处理错误

        } catch (error) {
            setLoading(false)

        }

    }


    return {
        run:cacheFetch,
        loading,
        data,

    }


}
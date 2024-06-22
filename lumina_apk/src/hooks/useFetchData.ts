import { useCallback, useEffect, useMemo, useRef, useState } from "react"

type UseFetchDataResult<T> = {
    run: () => void;
    res: T | null;
    loading: boolean;
    err: any;
    dataList:any[]
};
type Params = {
    [key: string]: any;
};

export const useFetchData=(fetch:(params?:any)=>Promise<any>,params:Params,cache?:boolean):UseFetchDataResult<any>=>{
    const [data,setData]=useState(null);
    const [err,setErr]=useState(null);
    const [loading,setLoading]=useState(false);
    const [params_cahe,setParams_cahe]=useState<any>('');
    const cache_request=useRef(fetch).current

    useEffect(()=>{
        if(JSON.stringify(params_cahe)!==JSON.stringify(params)){
            if(cache){
                setParams_cahe(params)
                return;
            }
            start(params)
        }
    },[params_cahe,params,cache])

    //异步函数
    function start(_params:any){
        setParams_cahe(_params)
        setLoading(true)
        fetch(_params).then(res=>{
            setData(res);
        }).catch((err:any)=>{
            setErr(err)
        }).finally(()=>{
            setLoading(false)
        })
    }

    const resData:any=useMemo(()=>{
        return data

    },[data])

    return {
        run:()=>{
            start(params_cahe);
        },
        res:resData,
        dataList:resData && Array.isArray(resData.data)?resData.data:[],
        loading,
        err,
    }

}
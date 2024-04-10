import React, { useEffect, useRef, useState } from "react";


interface configProps{
    run?:boolean,
    refreshKey?:string;
}

//传入要刷新的路由，每次进入当前路由刷新数据

const useRequest = <T>(fetch: any,config:configProps={}) => {
    const [data, setData] = useState<Array<any>>([]); // Added type for state
    const [loading, setLoading] = useState(true);
    const {run=true}=config;
    
    const refresh:any=useRef(null);
    const [error, setError] = useState<string>(''); // Added type for state

    useEffect(() => {
        if (loading) {
            const fetchData = async () => {
                try {
                    const result = await fetch();
                    console.log('请求结果',result);
                    
                    if (result.errs) {
                        setError(result.errs);
                    }
                    
                    setData(result.data);
                } catch (error: any) {
                console.log('请求出错啦');

                    setError(error.message || 'An error occurred');
                } finally {
                    setLoading(false);
                }
            };
            refresh.current=()=>{
                setLoading(true)
                setData([])

                fetchData();
            }
            console.log('开始请求',run);

            if(run){
                console.log('开始请求');
                
                fetchData();
            }

           
        }

    }, [fetch,loading,run]);

    return {
        data,
        loading,
        error,
        refresh:()=>{
            refresh.current();
        }
    };
}

export default useRequest;
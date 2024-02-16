import React, { useEffect, useRef, useState } from "react";



const useRequest = <T>(fetch: any,run:boolean=true) => {
    const [data, setData] = useState<Array<any>>([]); // Added type for state
    const [loading, setLoading] = useState(true);
    const refresh:any=useRef(null);
    const [error, setError] = useState<string>(''); // Added type for state

    useEffect(() => {
        if (loading) {
            const fetchData = async () => {
                try {
                    const result = await fetch();
                    if (result.errs) {
                        setError(result.errs);
                    }
                    setData(result.data);
                } catch (error: any) {
                    setError(error.message || 'An error occurred');
                } finally {
                    console.log('请求次数',11);
                    
                    setLoading(false);
                }
            };
            refresh.current=()=>{
                fetchData();
            }
            if(run){
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
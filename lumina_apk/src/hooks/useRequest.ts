import React, { useEffect, useState } from "react";



const useRequest = <T>(fetch: any) => {
    const [data, setData] = useState<Array<any>>([]); // Added type for state
    const [loading, setLoading] = useState(true);
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

            fetchData();
        }

    }, [fetch,loading]);

    return {
        data,
        loading,
        error,
    };
}

export default useRequest;
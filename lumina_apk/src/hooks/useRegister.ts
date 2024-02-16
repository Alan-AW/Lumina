import { useRoute } from "@react-navigation/native"
import { useEffect } from "react"
import { registerRefresh, uppdateRefresh } from "src/reduxCenter/actionCreators/refreshAction";
import { useAppDispatch, useAppSelector } from "src/reduxCenter/hooks";



const useRegister=(callback:()=>void)=>{
    const router=useRoute();
    const dispatch=useAppDispatch();
    const state=useAppSelector(state=>state.refesh)
    useEffect(()=>{
        dispatch(registerRefresh(router.name))
    },[])
    useEffect(()=>{
        if(state.refresh[router.name]){
            callback()
            dispatch(uppdateRefresh({routeKey:router.name,status:false}))
        }

    },[state.refresh])
}

export default useRegister;
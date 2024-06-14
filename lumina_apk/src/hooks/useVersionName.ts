import { useEffect, useState } from "react"
import { getAppVersionName } from "src/helpers/app"



export default ()=>{
    const [currentVersionName, setCurrentVersionName] = useState('')

    useEffect(()=>{
        getAppVersionName((v)=>{
            setCurrentVersionName(v)
        })
    },[])


    return currentVersionName
}
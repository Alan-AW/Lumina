


import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { ToastAndroid, View } from "react-native";
import AutoText from "src/components/AutoView/Text";
import { IconButton } from "src/components/Button";
import Center from "src/components/FlexView/Center";
import Start from "src/components/FlexView/Start";
import Loading from "src/components/Loading";
import Back from "src/components/ScreenHeader/Back";
import colors from "src/constants/colors";
import { APP_VERSION } from "src/constants/global";
import { updateApp } from "src/helpers/utils";
import { updateMenuStatus } from "src/reduxCenter/actionCreators";
import { useAppDispatch } from "src/reduxCenter/hooks";
import { auth_store } from "src/store/authStore";


export default function UpdateApp() {

    const route: any = useRoute();
    const [status,setStatus]=useState('点击下载')
    const { update_version, url } = route.params;
    const dispatch=useAppDispatch()


    function update() {
        setStatus('正在下载...')
        updateApp(url, update_version)
        ToastAndroid.show('正在下载...', ToastAndroid.SHORT)
    }

    return (
        <View style={{flex:1,backgroundColor:colors.themeBgColor}}>
            {/* <Start style={{paddingLeft:64,paddingTop:32}}>
                <Back noneText={false} customPress={(nav:any)=>{
                    nav.navigate('Home');
                    dispatch(updateMenuStatus(false))
                }} />
            </Start> */}
            <Center style={{ flex: 1 }}>
                <AutoText>当前版本：<AutoText style={{ color: colors.checked }}>{APP_VERSION}</AutoText></AutoText>
                <AutoText>新版本：<AutoText style={{ color: colors.checked }}>{update_version}</AutoText></AutoText>
                <IconButton onPress={update} style={{ paddingHorizontal: 32 }}>
                    <AutoText style={{ color: colors.btnRedColor }}>{status}</AutoText>
                </IconButton>
            </Center>
        </View>


    )
}



import React, { useEffect, useState } from "react";
import { ToastAndroid, View } from "react-native";
import { getAppVersion } from "src/apis/home";
import AutoText from "src/components/AutoView/Text";
import Center from "src/components/FlexView/Center";
import Start from "src/components/FlexView/Start";
import colors from "src/constants/colors";
import { APP_VERSION } from "src/constants/global";
import { checkUpdate } from "src/utils";


export default function Version() {
    const [data, setData] = useState<any>({});


    useEffect(() => {
        getAppVersion().then(res => {
            const { version, apk } = res.data;
            setData(res.data)
        }).catch(err => {
        })

    }, [])




    return (
        <Center style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', position: 'absolute', bottom: 0, right: 50, width: '100%' }}>
            <View>
                <AutoText style={{fontSize:30}}>当前版本：<AutoText style={{ color: colors.checked,fontSize:30 }}>{APP_VERSION}</AutoText></AutoText>
            </View>
            <Start style={{ marginVertical: 32 }}>
                <AutoText style={{fontSize:30}}>最新版本：<AutoText style={{ color: colors.btnRedColor, paddingLeft: 32, paddingRight: 32,fontSize:30 }}>{data.version}</AutoText>
                </AutoText>

            </Start>
        </Center>
    )
}
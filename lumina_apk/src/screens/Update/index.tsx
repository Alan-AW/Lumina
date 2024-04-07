import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { getUpdates } from "src/apis/home";
import Center from "src/components/FlexView/Center";
import Loading from "src/components/Loading";
import useRequest from "src/hooks/useRequest";
import { update_store } from "./data";
import Start from "src/components/FlexView/Start";
import { Tabs } from '@ant-design/react-native'
import AutoText from "src/components/AutoView/Text";
import UpdateTabs from "./Tabs";
import SpaceBetween from "src/components/FlexView/SpaceBetween";
import Back from "src/components/ScreenHeader/Back";
import { useInlineStyle } from "src/helpers/style";
import { useRoute } from "@react-navigation/native";
import End from "src/components/FlexView/End";
import colors from "src/constants/colors";





export default function Update() {
    const routes: any = useRoute();
    const [info, setInfo] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const device_id = '8RC4KBZ7' || routes.params.device_id;
    useEffect(() => {
        getUpdates('8RC4KBZ7').then(res => {
            if (res.code === 200 && res.status) {
                setInfo(res.data.data)
                update_store.instructions = res.data.data.instructions;
            }
            console.log('update 请求的结果', res);

        }).catch(err => {
            console.log('出现错误', err);

        }).finally(() => {
            setLoading(false)
        })
    }, [])

    console.log(info, 'info');

    function submit() {
        console.log('提交代码', info);
        console.log('提交代码', update_store.instructions);

    }




    return (
        <View style={useInlineStyle({ flex: 1, backgroundColor: '#fff', padding: 32, position: 'relative' })}>
            <Start>
                <Back />
            </Start>
            <Center style={{ flex: 1, marginRight: 32, padding: 16 }}>
                <Loading loading={loading}>
                    <SpaceBetween style={{ paddingVertical: 32 }}>
                        <AutoText>设备ID: <AutoText>{info.device_id}</AutoText></AutoText>
                        <AutoText>类型:<AutoText>{info.type}</AutoText></AutoText>
                        <AutoText>版本:<AutoText>{info.version}</AutoText></AutoText>
                        <AutoText>时间:<AutoText>{info.time}</AutoText></AutoText>
                    </SpaceBetween>
                    <View style={useInlineStyle({ flex: 1, paddingLeft: 0, marginTop: 32 })}>
                        <UpdateTabs />

                    </View>
                </Loading>
            </Center>
            <End style={{ position: 'absolute', left: 0, width: '100%', bottom: 100, paddingRight: '3%' }}>
                <TouchableOpacity style={useInlineStyle({ paddingVertical: 16, paddingHorizontal: 32, backgroundColor: colors.btn_primary })} onPress={submit}>
                    <AutoText style={{ color: '#fff' }}>提交</AutoText>
                </TouchableOpacity>
            </End>
        </View>


    )
}
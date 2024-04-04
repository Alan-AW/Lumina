import React from "react";
import { ScrollView, Text, View } from "react-native";
import { getUpdates } from "src/apis/home";
import Center from "src/components/FlexView/Center";
import Loading from "src/components/Loading";
import useRequest from "src/hooks/useRequest";
import { testData } from "./data";
import Start from "src/components/FlexView/Start";
import { Tabs } from '@ant-design/react-native'
import AutoText from "src/components/AutoView/Text";
import UpdateTabs from "./Tabs";
import SpaceBetween from "src/components/FlexView/SpaceBetween";
import Back from "src/components/ScreenHeader/Back";
import { useInlineStyle } from "src/helpers/style";





export default function Update() {

    const { loading, data } = useRequest(getUpdates);
    const _data = testData.data;


    return (
        <View style={useInlineStyle({ flex: 1, backgroundColor: '#fff', padding: 32 })}>
            <Start>
                <Back />
            </Start>
            <Center style={{ flex: 1, marginRight: 32, padding: 16 }}>
                <Loading loading={loading}>
                    <SpaceBetween style={{ paddingVertical: 32 }}>
                        <AutoText>设备ID: <AutoText>{_data.device_id}</AutoText></AutoText>
                        <AutoText>类型:<AutoText>{_data.type}</AutoText></AutoText>
                        <AutoText>版本:<AutoText>{_data.version}</AutoText></AutoText>
                        <AutoText>时间:<AutoText>{_data.time}</AutoText></AutoText>


                    </SpaceBetween>
                    <View style={{ flex: 1, paddingLeft: 0 }}>
                        <UpdateTabs />

                    </View>



                </Loading>
            </Center>
        </View>


    )
}
import React, { useEffect, useState } from "react";
import { ScrollView, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { getUpdates, submitUpdateJsonInfo } from "src/apis/home";
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
import ToastService from "src/helpers/toast";
import { deepData } from "src/utils";
import LocalesText from "src/components/Text";
import { locales } from "src/helpers/localesText";





export default function Update() {
    const routes: any = useRoute();
    const [info, setInfo] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const device_id = routes.params.device_id;
    useEffect(() => {
        getUpdates(device_id).then(res => {
            if (res.code === 200 && res.status) {
                setInfo(res.data.data)
                const resData = res.data.data.instructions;
                //复制data属性用于提交  数组用于修改
                const copyData = JSON.parse(JSON.stringify(res.data));
                delete copyData.data.instructions;
                //存入仓库
                update_store({
                    instructions: resData,
                    update_instructions: resData,
                    postParams: copyData
                })
            }
            console.log('update 请求的结果', res);

        }).catch(err => {
            console.log('出现错误', err);

        }).finally(() => {
            setLoading(false)
        })
    }, [])



    function submit() {
        const postParams = deepData(update_store.postParams)
        const update_instructions = deepData(update_store.update_instructions)
        const params = {
            algorithm: {
                ...postParams,
                data: {
                    ...postParams.data,
                    instructions: update_instructions

                }
            },
            unit_device_id: '8RC4KBZ7',

        }

        console.log('请求参数', params);

        submitUpdateJsonInfo(params).then(res => {
            console.log('提交请求结果', res);
            if (typeof res.errs === 'object') {
                ToastAndroid.show('数据更新失败', 3000)
                // ToastService.showToast('数据更新失败')
            } else {
                ToastAndroid.show('数据更新成功', 3000)

                // ToastService.showToast('数据更新成功')
            }


        }).catch(err => {
            console.log('提交请求结果失败', err);

            // ToastService.showToast('请求出错')
        })

    }




    return (
        <View style={useInlineStyle({ flex: 1, backgroundColor: '#fff', padding: 32, position: 'relative' })}>
            <SpaceBetween>
                <Back />
                <TouchableOpacity style={useInlineStyle({ paddingVertical: 16, paddingHorizontal: 32, backgroundColor: colors.btn_primary })} onPress={submit}>
                    <LocalesText languageKey={locales.Submit} style={{ color: '#fff' }} />
                </TouchableOpacity>
            </SpaceBetween>
            <Center style={{ flex: 1, marginRight: 32, padding: 16 }}>
                <Loading loading={loading}>
                    <SpaceBetween style={{ paddingVertical: 32 }}>
                        <LocalesText languageKey={locales.device_id} rightText={`：${info.device_id}`} />
                        <LocalesText languageKey={locales.type} rightText={`：${info.type}`} />
                        <LocalesText languageKey={locales.Version} rightText={`：${info.version}`} />
                        <LocalesText languageKey={locales.Time} rightText={`：${info.time}`} />
                    </SpaceBetween>
                    <View style={useInlineStyle({ flex: 1, paddingLeft: 0, marginTop: 32 })}>
                        <UpdateTabs />

                    </View>
                </Loading>
            </Center>

        </View>


    )
}
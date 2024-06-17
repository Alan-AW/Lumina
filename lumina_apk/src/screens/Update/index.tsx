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
import { FONT_SIZE } from "src/constants/style";
import CusTime from "./TabScreen/CusTime";
import AutoView from "src/components/AutoView/View";





export default function Update() {
    const routes: any = useRoute();
    const [info, setInfo] = useState<any>({});
    const [tod, setTod] = useState<any>('00:00:00');
    const [loading, setLoading] = useState(true);
    const {device_id,roomName,devicesName} = routes.params;
    useEffect(() => {
        getUpdates(device_id).then(res => {
            if (res.code === 200 && res.status) {
                setInfo(res.data.data)
                setTod(res.data.data.tod)
                const resData = res.data.data.instructions;
                //复制data属性用于提交  数组用于修改
                const copyData = JSON.parse(JSON.stringify(res.data));
                delete copyData.data.instructions;
                //存入仓库
                update_store({
                    instructions: deepData(resData),
                    update_instructions: JSON.parse(JSON.stringify(resData)),
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
                    tod,
                    instructions: update_instructions

                }
            },
            unit_device_id: device_id,

        }


        submitUpdateJsonInfo(params).then(res => {
            console.log('提交请求结果', res);
            if (typeof res.errs === 'object') {
                const errMessage = res.errs.non_field_errors;
                if (errMessage) {
                    ToastAndroid.show(errMessage.join(""), 3000)
                    return;

                }
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
        <View style={useInlineStyle({ flex: 1, backgroundColor: colors.themeBgColor, padding: 32, position: 'relative' })}>
            <View style={{ flex: 1 }}>
                <SpaceBetween>
                    <Start>
                        <Back noneText={true} />
                        <AutoText style={{ fontWeight: '700', fontSize: FONT_SIZE.title, color: '#4a4a4a' }}>{`${roomName} | ${devicesName}`}</AutoText>
                    </Start>


                    <TouchableOpacity style={useInlineStyle({ paddingVertical: 16, paddingHorizontal: 32, backgroundColor: colors.checked,borderRadius:8 })} onPress={submit}>
                        <LocalesText languageKey={locales.Submit} style={{ color: '#fff' }} />
                    </TouchableOpacity>
                </SpaceBetween>
                <Center style={{ flex: 1, marginRight: 32, padding: 16 }}>
                    <Loading loading={loading}>
                        <Start style={{ paddingVertical: 32 }}>
                            <LocalesText languageKey={locales.device_id} rightText={`：${info.device_id}`} style={{ fontSize: FONT_SIZE.subTitle }} />
                            {/* <LocalesText languageKey={locales.type} rightText={`：${info.type}`} /> */}
                            <LocalesText languageKey={locales.SystemVersion} rightText={`：${info.version}`} left={32} style={{ fontSize: FONT_SIZE.subTitle }} />
                            <LocalesText languageKey={locales.PlantingCycleStartTime} rightText={`：${info.time}`} left={48} style={{ fontSize: FONT_SIZE.subTitle }} />
                            <AutoView style={{ marginLeft: 208 }}>
                                <CusTime updateKey="duration" label={<LocalesText languageKey={locales.DaytimeStartTime} />} isSec={false}  value={info.tod} maxHour={24} isSpan={false} onChangeSelect={(v) => setTod(v)} />

                            </AutoView>
                        </Start>
                        <View style={useInlineStyle({ flex: 1, paddingLeft: 0, marginTop: 32 })}>
                            <UpdateTabs />

                        </View>
                    </Loading>
                </Center>
            </View>


        </View>


    )
}
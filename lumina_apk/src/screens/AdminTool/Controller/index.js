
import Slider from "@react-native-community/slider";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { ScrollView, Switch } from "react-native-gesture-handler";
import { Alert, View } from 'react-native'
import { getSetting, submitAdmin } from "src/apis/home";
import AutoText from "src/components/AutoView/Text";
import AutoView from "src/components/AutoView/View";
import Loading from "src/components/Loading";
import useRequest from "src/hooks/useRequest";
import ControllerItem from "./item/Item";
import ShadowCard from "src/components/Shadow";
import { useTranslation } from "react-i18next";
import { useRoute } from "@react-navigation/native";
import { FONT_SIZE } from "src/constants/style";
import Start from "src/components/FlexView/Start";
import { useFetch } from "src/hooks/useFetch";
import ToastService from "src/helpers/toast";
import { locales } from "src/helpers/localesText";
import CustomSwitch from "../Switch";
import CustomSLider from "../Slider";

// import { useTranslation } from 'react-i18next';

//判断一个数组中是否已有item
function hasItem(searchData, item, key = 'cmd') {
    return searchData.map(i => i[key]).includes(item[key])
}

function getMaxHeight(height1, height2) {
    if (height1 && !height2) {
        return height1;
    }
    if (!height1 && height2) {
        return height2
    }
    if (height1 && height2) {
        return height1 > height2 ? height1 : height2
    }
}

function format(str) {
    if (str.length >= 2) {
        let unit = str.substring(str.length - 1, str.length);
        if (unit === '%') {
            return Number(str.replace(unit, ''))
        }
    }
    return str;
}

const Controller = () => {
    // const { t,i18n } = useTranslation();
    const route = useRoute();
    // const { loading, data, error } = useRequest(() => getSetting({ id: route.params.id, language: i18n.language }));

    const { run, loading, data } = useFetch(() => getSetting({ id: route.params.id, language: i18n.language }));
    const { t, i18n } = useTranslation();
    const paramsList = useRef([])

    const [container, setContainer] = useState({

    })

    useEffect(() => {
        run()
    }, [])

    function updateData(item, callback) {
        const findIndex = paramsList.current.findIndex(i => i.cmd === item.cmd__cmd);
        paramsList.current[findIndex] = {
            cmd: item.cmd__cmd,
            value: item.value,
            auto: item.auto
        };
        console.log("AdminTool 参数", JSON.stringify({ id: route.params.id, data: paramsList.current }));

        //在这里发起保存，执行回调
        submitAdmin({ id: route.params.id, data: paramsList.current }).then(res => {
            if (res.code == 200) {
                if (res.errs) {
                    ToastService.showToast(locales.operationFailed);
                    return;
                }
                ToastService.showToast(locales.operationSuccessful)
                run()
                // if (callback) {
                //     callback()
                // }
            }

        }).catch(err=>{
            ToastService.showToast(locales.operationFailed);

            console.log('请求失败');
        })

    }

    const dataMap = useMemo(() => {
        const _value = [];
        const info = [];
        if (data) {
            console.log(JSON.stringify(data), '这是请求数据');
            for (let key in data) {
                _value.push({
                    title: key,
                    clildren: data[key]
                })
                data[key].forEach(item => {
                    info.push({
                        cmd: item.cmd__cmd,
                        value: item.value,
                        auto: item.auto
                    })
                });
                paramsList.current = info

            }
            return _value;
        }
        return _value;

    }, [data])



    return (
        <ScrollView style={{ flex: 1 }}>
            <Loading loading={loading}>
                <AutoView isRow style={{ alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 0, borderRadius: 5 }}>
                    <Start>
                        <AutoView style={{ width: 50, height: 30, backgroundColor: '#a5ce77' }} />
                        <AutoText style={{ paddingHorizontal: 32, fontSize: 30, fontWeight: '700', paddingBottom: 5 }}>{t('automatic')}</AutoText>
                    </Start>
                    <Start>
                        <AutoView style={{ width: 50, height: 30, backgroundColor: '#e1e1e1', borderRadius: 5 }} />
                        <AutoText style={{ paddingHorizontal: 32, fontSize: 30, fontWeight: '700', paddingBottom: 5 }}>{t('Manual')}</AutoText>
                    </Start>
                </AutoView>
                <AutoView style={{ alignItems: 'flex-start', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap' }} isRow>
                    {
                        dataMap.map((item, index) => {
                            console.log(item.title, 'item.title');
                            if (index === 0) {
                                return (
                                    <ShadowCard key={index} style={{ width: '48%', padding: 32 }}>
                                        <AutoView style={{ paddingLeft: 0, paddingRight: 32, marginBottom: 20 }}>
                                            <AutoText style={{ fontWeight: '700', fontSize: FONT_SIZE.title }}>{item.title}</AutoText>
                                        </AutoView>
                                        {
                                            item.clildren.map((cmdItem, cmdIndex) => {
                                                const { step, auto, value, min_value, max_value, cmd__cmd, desc, unit } = cmdItem;
                                                const findSpectra = item.clildren.find(i => i.cmd__cmd === "spectra" && i.auto === true);
                                                const isSpectra = cmdItem.cmd__cmd === "spectra";
                                                return (
                                                    <AutoView key={cmdIndex} style={{ marginBottom: 36 }}>
                                                        <CustomSwitch value={auto} title={desc} cmdIndex={cmdIndex < 2} disabled={isSpectra ? false : !!findSpectra} onChange={(v) => {
                                                            updateData({
                                                                cmd__cmd: cmd__cmd,
                                                                value: value,
                                                                auto: v
                                                            })
                                                        }} />
                                                        {
                                                            cmdIndex > 0 && <CustomSLider
                                                                step={Number(step)} unit={unit} title={desc} disabled={!!findSpectra}
                                                                value={Number(value)} max={Number(format(max_value))} min={Number(format(min_value))} onChange={(v) => {
                                                                    updateData({
                                                                        cmd__cmd: cmd__cmd,
                                                                        value: Number(v),
                                                                        auto: auto
                                                                    })
                                                                }} />
                                                        }

                                                    </AutoView>
                                                )
                                            })
                                        }
                                    </ShadowCard>
                                )

                            }
                            if (index === 1) {
                                return (
                                    <ShadowCard key={index} style={{ width: '48%', padding: 32 }}>
                                        <AutoView style={{ paddingLeft: 0, paddingRight: 32, marginBottom: 20 }}>
                                            <AutoText style={{ fontWeight: '700', fontSize: FONT_SIZE.title }}>{item.title}</AutoText>
                                        </AutoView>
                                        {
                                            item.clildren.map((cmdItem, cmdIndex) => {
                                                const { step, auto, value, min_value, max_value, cmd__cmd, desc, unit } = cmdItem;

                                                return (
                                                    <AutoView key={cmdIndex} style={{}}>
                                                        <CustomSwitch value={auto} cmdIndex={cmdIndex < 2} title={desc} disabled={false} onChange={(v) => {
                                                            updateData({
                                                                cmd__cmd: cmd__cmd,
                                                                value: value,
                                                                auto: v
                                                            })
                                                        }} />
                                                        <CustomSLider step={Number(step)} unit={unit} title={desc} disabled={false} value={Number(value)} max={Number(format(max_value))} min={Number(format(min_value))} onChange={(v) => {
                                                            updateData({
                                                                cmd__cmd: cmd__cmd,
                                                                value: v,
                                                                auto: auto
                                                            })
                                                        }} />
                                                    </AutoView>
                                                )
                                            })
                                        }
                                    </ShadowCard>
                                )

                            }
                            return null
                            // <AutoView key={index}
                            //     style={{ width: '48%', margin: 10, padding: 32 }}>
                            //     <ShadowCard style={{ height: getMaxHeight(container[index], container[index + 1]), padding: 32, minHeight: 500 }}>
                            //         <AutoView style={{ paddingLeft: 0, paddingRight: 32, marginBottom: 20 }}>
                            //             <AutoText style={{ fontWeight: '700', fontSize: FONT_SIZE.title }}>{item.title}</AutoText>
                            //         </AutoView>
                            //         <AutoView>

                            //             {
                            //                 item.clildren.map((_value, _index) => {
                            //                     const SWITCH_TYPE = 'switch';
                            //                     const SLIDER_TYPE = 'slide';
                            //                     if (item.component === SWITCH_TYPE) {
                            //                         return <SwitchItem item={item} itemData={itemData} onChange={onChange} />
                            //                     }
                            //                     if (item.component === SLIDER_TYPE) {
                            //                         return <SliderItem item={item} itemData={itemData} onChange={onChange} />
                            //                     }
                            //                     return (

                            //                         <ControllerItem key={_index} itemData={item.clildren} item={_value} onChange={updateData} />
                            //                     )
                            //                 })
                            //             }

                            //         </AutoView>

                            //     </ShadowCard>
                            // </AutoView>
                        })
                    }


                </AutoView>


            </Loading>
        </ScrollView>

    )
}


export default Controller;
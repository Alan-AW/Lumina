import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AutoText from "src/components/AutoView/Text";
import Center from "src/components/FlexView/Center";
import SpaceBetween from "src/components/FlexView/SpaceBetween";
import Start from "src/components/FlexView/Start";
import ShadowCard from "src/components/Shadow";
import { useInlineStyle } from "src/helpers/style";
import { numberToFixed } from "src/utils";
import { settings, updateArr } from "../data";
import PickModal from "src/components/PickModal";
import Slider from "@react-native-community/slider";
import PickTime from "src/components/PickTime";
import colors from "src/constants/colors";

interface TabScreenProps {
    data: any;
}

const width = 50;
const sliderRadius = 3;

function insertArr(obj: any) {
    const maxArr: any[] = [];
    const minArr: any[] = [];
    for (let key in obj) {
        if (key.includes('max')) {
            maxArr.push({
                name: key,
                value: obj[key],
                step: obj[key] > 10 ? 1 : 0.01,
                maxValue: obj[key] > 10 ? 100 : 10
            })
            continue;
        }
        if (key.includes('min')) {
            minArr.push({
                name: key,
                value: obj[key],
                minValue: 0
            })
            continue;

        }
    }
    //组装成一个数组
    const returnData = [];
    for (let i = 0; i < minArr.length; i++) {
        const key = minArr[i].name.split('min');
        const findMax = maxArr.find(item => item.name === key.join('max'));
        if (findMax) {
            for (let setKey in settings) {
                const newArr = JSON.parse(JSON.stringify(key))
                const value = newArr[0].substring(0, newArr[0].length - 1)
                const setMax = [value, newArr[1]];
                let str = setMax.join("");
                const selectKey = setKey.substring(0, setKey.lastIndexOf('_'));
                if (str.includes(selectKey)) {
                    returnData.push({
                        name: key.join(''),
                        value: [minArr[i].value, findMax.value],
                        max: settings[setKey].max,
                        step: settings[setKey].step,
                        min: settings[setKey].min,
                        maxName: findMax.name,
                        minName: minArr[i].name,
                    })

                    break;
                }
                // str=str.substring(0,str.lastIndexOf('_'))

            }


            continue;
        }
    }
    console.log(returnData, 99);

    return returnData;
}

function objToArr(obj: any) {
    const arr: any = []
    for (let key in obj) {
        arr.push({
            name: key,
            value: obj[key]
        })


    }
    return arr;
}

const renderLabel = (v: any) => {
    const {
        oneMarkerValue,
        twoMarkerValue,
        oneMarkerLeftPosition,
        twoMarkerLeftPosition,
        oneMarkerPressed,
        twoMarkerPressed,
    } = v;
    return (
        <View style={{ position: 'relative' }}>
            {Number.isFinite(oneMarkerLeftPosition) &&
                Number.isFinite(oneMarkerValue) && (
                    <View
                        style={[
                            styles.sliderLabel,
                            { left: oneMarkerLeftPosition - width / 2 + sliderRadius },
                            oneMarkerPressed && styles.markerPressed,
                        ]}
                    >
                        <AutoText style={styles.sliderLabelText}>{numberToFixed(Number(oneMarkerValue), 2)}</AutoText>
                    </View>
                )}

            {Number.isFinite(twoMarkerLeftPosition) &&
                Number.isFinite(twoMarkerValue) && (
                    <View
                        style={[
                            styles.sliderLabel,
                            { left: twoMarkerLeftPosition - width / 2 + sliderRadius },
                            twoMarkerPressed && styles.markerPressed,
                        ]}
                    >
                        <AutoText style={styles.sliderLabelText}>{numberToFixed(Number(twoMarkerValue), 2)}</AutoText>
                    </View>
                )}
        </View>
    )
}

export default function TabScreen(props: TabScreenProps) {

    const { actions, days_max, days_min, duration } = props.data;
    const pick1: any = useRef(null);
    const pick2: any = useRef(null);
    const pick3: any = useRef(null);

    const select: any = useRef(null)
    const currentOpenNumber: any = useRef(null);


    const actions0 = actions[0] || {};
    const actions1 = actions[1] || {};
    const actions2 = actions[2] || {};

    const form0 = insertArr(actions0);
    const form1 = insertArr(actions1);

    //打开选择器
    function openPick1(key: string, number: number) {
        //设置需要设置的字段
        select.current = key;
        currentOpenNumber.current = number
        if (number == 1) {
            pick1.current.open()
        }
        if (number == 2) {
            pick2.current.open()
        }
        if (number == 3) {
            pick3.current.open()
        }
    }

    function handleCallback(item: any) {
        console.log('选择的选项', item);
        updateArr({
            [select.current]: item,
        })

    }






    return (
        <ScrollView style={useInlineStyle({ flex: 1, backgroundColor: '#fff', marginRight: 32 })}>
            <Start style={{ padding: 32, paddingVertical: 48 }}>
                <Start style={{ marginRight: 32 }}>
                    <AutoText style={{ paddingRight: 24 }}>days_max</AutoText>
                    <AutoText>{days_max}</AutoText>
                </Start>
                <Start style={{ marginRight: 32 }}>
                    <AutoText>days_min</AutoText>
                    <AutoText style={{ paddingRight: 24 }}>{days_min}</AutoText>
                </Start>
                <Start style={{ marginRight: 32 }}>
                    <AutoText>duration</AutoText>
                    <AutoText style={{ paddingRight: 24 }}>{duration}</AutoText>
                </Start>
            </Start>
            <Start style={{ flex: 1, padding: 0, alignItems: 'flex-start' }}>
                <ShadowCard style={{ borderWidth: 1, borderColor: '#ddd', width: '30%', paddingHorizontal: 24, paddingVertical: 16 }}>
                    <View>
                        <SpaceBetween style={{ paddingVertical: 16 }}>
                            <AutoText>hardware</AutoText>
                            <AutoText>{actions0.hardware}</AutoText>
                        </SpaceBetween>
                        <SpaceBetween style={{ paddingVertical: 16 }} onPress={() => openPick1('vpd_priority_day', 1)}>
                            <AutoText>vpd_priority_day</AutoText>

                            <AutoText style={{ color: colors.checked }}>{actions0.vpd_priority_day}</AutoText>
                        </SpaceBetween>
                        <SpaceBetween style={{ paddingVertical: 16 }} onPress={() => openPick1('vpd_priority_night', 1)}>
                            <AutoText>vpd_priority_night</AutoText >
                            <AutoText style={{ color: colors.checked }}>{actions0.vpd_priority_night}</AutoText>
                        </SpaceBetween>

                    </View>
                    <View style={{ marginTop: 8 }}>
                        {
                            form0.map((formItem: any, index: number) => {
                                return (
                                    <SpaceBetween key={index} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <AutoText>{formItem.name}</AutoText>
                                        <Center style={{ width: '100%', marginTop: 50 }}>
                                            <MultiSlider values={formItem.value} onValuesChangeFinish={(v) => {
                                                updateArr({
                                                    [formItem.minName]: v[0],
                                                    [formItem.maxName]: v[1],
                                                })

                                            }} selectedStyle={{ backgroundColor: colors.checked }}
                                                markerStyle={{ backgroundColor: colors.checked }} min={formItem.min} max={formItem.max} step={formItem.step} enableLabel customLabel={renderLabel} />
                                        </Center>
                                    </SpaceBetween>
                                )
                            })
                        }
                    </View>

                </ShadowCard>
                <ShadowCard style={{ borderWidth: 1, borderColor: '#ddd', width: '30%', paddingHorizontal: 24, marginLeft: '3%', paddingVertical: 16 }}>
                    <SpaceBetween style={{ paddingVertical: 16 }}>
                        <AutoText>hardware</AutoText>
                        <AutoText>{actions1.hardware}</AutoText>
                    </SpaceBetween>
                    <View style={{ marginTop: 8 }}>
                        {
                            form1.map((formItem: any, index: number) => {
                                return (
                                    <SpaceBetween key={index} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <AutoText>{formItem.name}</AutoText>
                                        <Center style={{ width: '100%', marginTop: 50 }}>
                                            <MultiSlider values={formItem.value} min={formItem.min}
                                                selectedStyle={{ backgroundColor: colors.checked }}
                                                markerStyle={{ backgroundColor: colors.checked }}
                                                onValuesChangeFinish={(v) => {
                                                    updateArr({
                                                        [formItem.minName]: v[0],
                                                        [formItem.maxName]: v[1],
                                                    })
                                                }}
                                                max={formItem.max} step={formItem.step} enableLabel customLabel={renderLabel} />
                                        </Center>
                                    </SpaceBetween>
                                )
                            })
                        }
                    </View>
                </ShadowCard>
                <ShadowCard style={{ borderWidth: 1, borderColor: '#ddd', width: '30%', paddingHorizontal: 24, marginLeft: '3%', paddingVertical: 16 }}>
                    <SpaceBetween style={{ width: '100%', paddingVertical: 16 }}>
                        <AutoText>hardware</AutoText>
                        <AutoText>{actions2.hardware}</AutoText>
                    </SpaceBetween>
                    <SpaceBetween style={{ width: '100%', paddingVertical: 16 }} onPress={() => openPick1('fade_curve_type', 2)}>
                        <AutoText>fade_curve_type</AutoText>
                        <AutoText style={{ color: colors.checked }}>{actions2.fade_curve_type}</AutoText>
                    </SpaceBetween>
                    <SpaceBetween style={{ width: '100%', paddingVertical: 16 }} onPress={() => openPick1('fade_curve_duration', 3)} disabled={actions2.fade_curve_type === 'none'}>
                        <AutoText>fade_curve_duration</AutoText>
                        <AutoText style={{ color: colors.checked }}>{actions2.fade_curve_duration}</AutoText>
                    </SpaceBetween>
                    <Start style={{ width: '100%', paddingVertical: 16 }}>
                        <AutoText>spectra_450_led</AutoText>
                    </Start>
                    <Slider maximumValue={255} minimumValue={0} value={actions2.spectra_450_led} step={1} thumbTintColor={colors.checked} minimumTrackTintColor={colors.checked} />
                    <SpaceBetween style={{ width: '100%', marginBottom: 32 }}>
                        <AutoText>spectra_660_led</AutoText>
                    </SpaceBetween>
                    <Slider maximumValue={255} minimumValue={0} value={actions2.spectra_660_led} step={1} thumbTintColor={colors.checked} minimumTrackTintColor={colors.checked} />

                    <SpaceBetween style={{ width: '100%', marginBottom: 32 }}>
                        <AutoText>spectra_main_led</AutoText>
                    </SpaceBetween>
                    <Slider maximumValue={255} minimumValue={0} value={actions2.spectra_main_led} step={1} thumbTintColor={colors.checked} minimumTrackTintColor={colors.checked} />


                </ShadowCard>

            </Start>
            <PickModal ref={pick1} data={['temp', 'rh']} onChange={handleCallback} />
            <PickTime ref={pick3} data={actions2.fade_curve_duration} onChange={handleCallback} />
            <PickModal ref={pick2} data={['linear', 'exponential', 'none']} onChange={handleCallback} />


        </ScrollView>
    )

}

const styles = StyleSheet.create({
    sliderLabel: {
        position: 'absolute',
        bottom: -10,
        minWidth: 50,
        padding: 8,
        //   backgroundColor: '#f1f1f1',
    },
    sliderLabelText: {
        alignItems: 'center',
        textAlign: 'center',
        fontStyle: 'normal',
        fontSize: 20,
    },
    markerPressed: {
        borderWidth: 2,
        borderColor: '#999',
    },
});

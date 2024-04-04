import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AutoText from "src/components/AutoView/Text";
import Center from "src/components/FlexView/Center";
import SpaceBetween from "src/components/FlexView/SpaceBetween";
import Start from "src/components/FlexView/Start";
import ShadowCard from "src/components/Shadow";
import { useInlineStyle } from "src/helpers/style";
import { numberToFixed } from "src/utils";

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
    const newArr = [];
    for (let i = 0; i < minArr.length; i++) {
        const key = minArr[i].name.split('min');
        const findMax = maxArr.find(item => item.name === key.join('max'));
        if (findMax) {
            newArr.push({
                name: key.join(''),
                value: [minArr[i].value, findMax.value],
                max: findMax.maxValue,
                step: findMax.step,
                min: minArr[i].minValue,
            })
            continue;
        }
    }
    return newArr;
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


    const actions0 = actions[0] || {};
    const actions1 = actions[1] || {};
    const actions2 = actions[2] || {};

    const form0 = insertArr(actions0);
    const form1 = insertArr(actions1);




    return (
        <ScrollView style={useInlineStyle({ flex: 1, backgroundColor: '#fff', marginRight: 32 })}>
            <Start style={{ padding: 32 }}>
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
                        <SpaceBetween style={{ paddingVertical: 8 }}>
                            <AutoText>hardware</AutoText>
                            <AutoText>{actions0.hardware}</AutoText>
                        </SpaceBetween>
                        <SpaceBetween style={{ paddingVertical: 8 }}>
                            <AutoText>vpd_priority_day</AutoText>
                            <AutoText>{actions0.vpd_priority_day}</AutoText>
                        </SpaceBetween>
                        <SpaceBetween style={{ paddingVertical: 8 }}>
                            <AutoText>vpd_priority_night</AutoText>
                            <AutoText>{actions0.vpd_priority_night}</AutoText>
                        </SpaceBetween>

                    </View>
                    <View style={{ marginTop: 8 }}>
                        {
                            form0.map((formItem: any, index: number) => {
                                return (
                                    <SpaceBetween key={index} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <AutoText>{formItem.name}</AutoText>
                                        <Center style={{ width: '100%', marginTop: 50 }}>
                                            <MultiSlider values={formItem.value} min={formItem.min} max={formItem.max} step={formItem.step} enableLabel customLabel={renderLabel} />
                                        </Center>
                                    </SpaceBetween>
                                )
                            })
                        }
                    </View>

                </ShadowCard>
                <ShadowCard style={{ borderWidth: 1, borderColor: '#ddd', width: '30%', paddingHorizontal: 24, marginLeft: '3%', paddingVertical: 16 }}>
                    <View>
                        <Start>
                            <AutoText>hardware</AutoText>
                            <AutoText>{actions1.hardware}</AutoText>
                        </Start>

                    </View>
                    <View style={{ marginTop: 8 }}>
                        {
                            form1.map((formItem: any, index: number) => {
                                return (
                                    <SpaceBetween key={index} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <AutoText>{formItem.name}</AutoText>
                                        <Center style={{ width: '100%', marginTop: 50 }}>
                                            <MultiSlider values={formItem.value} min={formItem.min} max={formItem.max} step={formItem.step} enableLabel customLabel={renderLabel} />
                                        </Center>
                                    </SpaceBetween>
                                )
                            })
                        }
                    </View>
                </ShadowCard>
                <ShadowCard style={{ borderWidth: 1, borderColor: '#ddd', width: '30%', paddingHorizontal: 24, marginLeft: '3%', paddingVertical: 16 }}>
                    {
                        objToArr(actions2).map((item: any, index: number) => {
                            return (
                                <SpaceBetween key={index} style={{ width: '100%',marginBottom:32 }}>
                                    <AutoText>{item.name}</AutoText>
                                    <AutoText>{item.value}</AutoText>
                                </SpaceBetween>
                            )
                        })
                    }
                </ShadowCard>
             
            </Start>



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

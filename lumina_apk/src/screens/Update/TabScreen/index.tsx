import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import AutoText from "src/components/AutoView/Text";
import Center from "src/components/FlexView/Center";
import SpaceBetween from "src/components/FlexView/SpaceBetween";
import Start from "src/components/FlexView/Start";
import ShadowCard from "src/components/Shadow";
import { adaptationConvert, useInlineStyle } from "src/helpers/style";
import { numberToFixed } from "src/utils";
import { settings, updateArr } from "../data";
import PickModal from "src/components/PickModal";
import Slider from "@react-native-community/slider";
import PickTime from "src/components/PickTime";
import colors from "src/constants/colors";
import PickRegion from "src/components/PickRegion";

interface TabScreenProps {
    data: any;
}

const width = 50;
const sliderRadius = 3;



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
    const [inputMinValue, setInputMinValue] = useState(days_min)
    const [inputMaxValue, setInputMaxValue] = useState(days_max)
    const pick1: any = useRef(null);
    const pick2: any = useRef(null);
    const pick3: any = useRef(null);

    const select: any = useRef(null)
    const currentOpenNumber: any = useRef(null);


    const actions0 = actions[0] || {};
    const actions1 = actions[1] || {};
    const actions2 = actions[2] || {};



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


    function onValuesFinish(key: string[], v: number[]) {
        updateArr({
            [key[0]]: v[0],
            [key[1]]: v[1],
        })
    }



    return (
        <ScrollView style={useInlineStyle({ flex: 1, backgroundColor: '#fff', marginRight: 32 })}>
            <Start style={{ padding: 32, paddingVertical: 48 }}>
                <Start style={{ marginRight: 32, height: 80 }}>
                    <AutoText style={{ paddingRight: 32 }}>days_min</AutoText>
                    <TextInput keyboardType='numeric' value={`${inputMinValue}`}
                        onBlur={() => {
                            const _value = Number(inputMinValue);
                            let setValue = 0;
                            if (!_value || isNaN(_value)) {
                                setInputMinValue(days_min);
                                return;
                            }
                            setValue=_value;

                            if (_value >= days_max) {
                                setInputMinValue(days_max-1)
                                setValue = days_max-1;
                            }
                            if (_value <= 0) {
                                setInputMinValue(days_min + 1)
                                setValue = 1;
                            }
                            updateArr({
                                days_min: setValue
                            })

                        }}
                        onChangeText={setInputMinValue}
                        style={{ borderBottomWidth: 1, borderColor: '#ddd', height: '100%', padding: 0, textAlign: 'center', color: colors.checked,width:adaptationConvert(150) }} />
                </Start>
                <Start style={{ marginRight: 32 }}>
                    <AutoText style={{ paddingRight: 32 }}>days_max {days_max}</AutoText>
                    <TextInput keyboardType='numeric' value={`${inputMaxValue}`}
                        onBlur={() => {
                            const _value = Number(inputMaxValue);
                            let setValue = 0;
                            if (!_value || isNaN(_value)) {
                                setInputMaxValue(days_max);
                                return;
                            }
                            setValue=_value;
                            if (_value >= 30) {
                                setInputMaxValue(30)
                                setValue = 30;
                            }
                            if (_value <= days_min) {
                                setInputMaxValue(days_min + 1)
                                setValue = days_min + 1;
                            }
                            
                            updateArr({
                                days_max: setValue
                            })

                        }}
                        onChangeText={setInputMaxValue}
                        style={{ borderBottomWidth: 1, borderColor: '#ddd', height: '100%', padding: 0, textAlign: 'center', color: colors.checked,width:adaptationConvert(150) }} />
                </Start>

                <Start style={{ marginRight: 32 }} onPress={() => openPick1('duration', 3)}>
                    <AutoText>duration</AutoText>
                    <AutoText style={{ paddingRight: 24,color:colors.checked }}>{duration}</AutoText>
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
                        <SpaceBetween style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <AutoText>target_rh_day</AutoText>
                            <Center style={{ width: '100%', marginTop: 50 }}>
                                <MultiSlider values={[actions0.target_rh_min_day, actions0.target_rh_max_day]} onValuesChangeFinish={(v) => {
                                    updateArr({
                                        target_rh_min_day: v[0],
                                        target_rh_max_day: v[1],
                                        target_rh_deadband_min_day: v[0] > actions0.target_rh_deadband_min_day ? v[0] : actions0.target_rh_deadband_min_day,
                                        target_rh_deadband_max_day: v[1] < actions0.target_rh_deadband_max_day ? v[1] : actions0.target_rh_deadband_max_day,
                                    })
                                }} selectedStyle={{ backgroundColor: colors.checked }}
                                    markerStyle={{ backgroundColor: colors.checked }} min={0.3} max={0.85} step={0.01} enableLabel customLabel={renderLabel} />
                            </Center>
                        </SpaceBetween>
                        <SpaceBetween style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <AutoText>target_rh_deadband_day</AutoText>
                            <Center style={{ width: '100%', marginTop: 50 }}>
                                <MultiSlider values={[actions0.target_rh_deadband_min_day, actions0.target_rh_deadband_max_day]} onValuesChangeFinish={(v) => onValuesFinish(['target_rh_deadband_min_day', 'target_rh_deadband_max_day'], v)} selectedStyle={{ backgroundColor: colors.checked }}
                                    markerStyle={{ backgroundColor: colors.checked }} min={actions0.target_rh_min_day} max={actions0.target_rh_max_day} step={0.01} enableLabel customLabel={renderLabel} />
                            </Center>
                        </SpaceBetween>



                        <SpaceBetween style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <AutoText>target_vpd_day</AutoText>
                            <Center style={{ width: '100%', marginTop: 50 }}>
                                <MultiSlider values={[actions0.target_vpd_min_day, actions0.target_vpd_max_day]} onValuesChangeFinish={(v) => {
                                    updateArr({
                                        target_vpd_min_day: v[0],
                                        target_vpd_max_day: v[1],
                                        target_vpd_deadband_min_day: v[0] > actions0.target_vpd_deadband_min_day ? v[0] : actions0.target_vpd_deadband_min_day,
                                        target_vpd_deadband_max_day: v[1] < actions0.target_vpd_deadband_max_day ? v[1] : actions0.target_vpd_deadband_max_day,
                                    })
                                }} selectedStyle={{ backgroundColor: colors.checked }}
                                    markerStyle={{ backgroundColor: colors.checked }} min={0.3} max={3.5} step={0.1} enableLabel customLabel={renderLabel} />
                            </Center>
                        </SpaceBetween>
                        <SpaceBetween style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <AutoText>target_vpd_deadband_day</AutoText>
                            <Center style={{ width: '100%', marginTop: 50 }}>
                                <MultiSlider values={[actions0.target_vpd_deadband_min_day, actions0.target_vpd_deadband_max_day]} onValuesChangeFinish={(v) => onValuesFinish(['target_vpd_deadband_min_day', 'target_vpd_deadband_max_day'], v)} selectedStyle={{ backgroundColor: colors.checked }}
                                    markerStyle={{ backgroundColor: colors.checked }} min={actions0.target_vpd_min_day} max={actions0.target_vpd_max_day} step={0.1} enableLabel customLabel={renderLabel} />
                            </Center>
                        </SpaceBetween>



                        <SpaceBetween style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <AutoText>target_rh_night</AutoText>
                            <Center style={{ width: '100%', marginTop: 50 }}>
                                <MultiSlider values={[actions0.target_rh_min_night, actions0.target_rh_max_night]} onValuesChangeFinish={(v) => {
                                    updateArr({
                                        target_rh_min_night: v[0],
                                        target_rh_max_night: v[1],
                                        target_rh_deadband_min_night: v[0] > actions0.target_rh_deadband_min_night ? v[0] : actions0.target_rh_deadband_min_night,
                                        target_rh_deadband_max_night: v[1] < actions0.target_rh_deadband_max_night ? v[1] : actions0.target_rh_deadband_max_night,
                                    })
                                }} selectedStyle={{ backgroundColor: colors.checked }}
                                    markerStyle={{ backgroundColor: colors.checked }} min={0.3} max={0.85} step={0.01} enableLabel customLabel={renderLabel} />
                            </Center>
                        </SpaceBetween>
                        <SpaceBetween style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <AutoText>target_rh_deadband_night</AutoText>
                            <Center style={{ width: '100%', marginTop: 50 }}>
                                <MultiSlider values={[actions0.target_rh_deadband_min_night, actions0.target_rh_deadband_max_night]} onValuesChangeFinish={(v) => onValuesFinish(['target_rh_deadband_min_night', 'target_rh_deadband_max_night'], v)} selectedStyle={{ backgroundColor: colors.checked }}
                                    markerStyle={{ backgroundColor: colors.checked }} min={actions0.target_rh_min_night} max={actions0.target_rh_max_night} step={0.01} enableLabel customLabel={renderLabel} />
                            </Center>
                        </SpaceBetween>

                        <SpaceBetween style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <AutoText>target_vpd_night</AutoText>
                            <Center style={{ width: '100%', marginTop: 50 }}>
                                <MultiSlider values={[actions0.target_vpd_min_night, actions0.target_vpd_max_night]} onValuesChangeFinish={(v) => {
                                    updateArr({
                                        target_vpd_min_night: v[0],
                                        target_vpd_max_night: v[1],
                                        target_vpd_deadband_min_night: v[0] > actions0.target_vpd_deadband_min_night ? v[0] : actions0.target_vpd_deadband_min_night,
                                        target_vpd_deadband_max_night: v[1] < actions0.target_vpd_deadband_max_night ? v[1] : actions0.target_vpd_deadband_max_night,
                                    })
                                }} selectedStyle={{ backgroundColor: colors.checked }}
                                    markerStyle={{ backgroundColor: colors.checked }} min={0.3} max={3.5} step={0.1} enableLabel customLabel={renderLabel} />
                            </Center>
                        </SpaceBetween>
                        <SpaceBetween style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <AutoText>target_vpd_deadband_night</AutoText>
                            <Center style={{ width: '100%', marginTop: 50 }}>
                                <MultiSlider values={[actions0.target_vpd_deadband_min_night, actions0.target_vpd_deadband_max_night]} onValuesChangeFinish={(v) => onValuesFinish(['target_vpd_deadband_min_night', 'target_vpd_deadband_max_night'], v)} selectedStyle={{ backgroundColor: colors.checked }}
                                    markerStyle={{ backgroundColor: colors.checked }} min={actions0.target_vpd_min_night} max={actions0.target_vpd_max_night} step={0.1} enableLabel customLabel={renderLabel} />
                            </Center>
                        </SpaceBetween>

                        <SpaceBetween style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <AutoText>target_amb_temp_day</AutoText>
                            <Center style={{ width: '100%', marginTop: 50 }}>
                                <MultiSlider values={[actions0.target_amb_temp_min_day, actions0.target_amb_temp_max_day]} onValuesChangeFinish={(v) => {
                                    updateArr({
                                        target_amb_temp_min_day: v[0],
                                        target_amb_temp_max_day: v[1],
                                        target_amb_temp_deadband_min_day: v[0] > actions0.target_amb_temp_deadband_min_day ? v[0] : actions0.target_amb_temp_deadband_min_day,
                                        target_amb_temp_deadband_max_day: v[1] < actions0.target_amb_temp_deadband_max_day ? v[1] : actions0.target_amb_temp_deadband_max_day,
                                    })
                                }} selectedStyle={{ backgroundColor: colors.checked }}
                                    markerStyle={{ backgroundColor: colors.checked }} min={8} max={35} step={1} enableLabel customLabel={renderLabel} />
                            </Center>
                        </SpaceBetween>
                        <SpaceBetween style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <AutoText>target_amb_temp_deadband_day</AutoText>
                            <Center style={{ width: '100%', marginTop: 50 }}>
                                <MultiSlider values={[actions0.target_amb_temp_deadband_min_day, actions0.target_amb_temp_deadband_max_day]} onValuesChangeFinish={(v) => onValuesFinish(['target_amb_temp_deadband_min_day', 'target_amb_temp_deadband_max_day'], v)} selectedStyle={{ backgroundColor: colors.checked }}
                                    markerStyle={{ backgroundColor: colors.checked }} min={actions0.target_amb_temp_min_day} max={actions0.target_amb_temp_max_day} step={1} enableLabel customLabel={renderLabel} />
                            </Center>
                        </SpaceBetween>

                        <SpaceBetween style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <AutoText>target_amb_temp_night</AutoText>
                            <Center style={{ width: '100%', marginTop: 50 }}>
                                <MultiSlider values={[actions0.target_amb_temp_min_night, actions0.target_amb_temp_max_night]} onValuesChangeFinish={(v) => {
                                    updateArr({
                                        target_amb_temp_min_night: v[0],
                                        target_amb_temp_max_night: v[1],
                                        target_amb_temp_deadband_min_night: v[0] > actions0.target_amb_temp_deadband_min_night ? v[0] : actions0.target_amb_temp_deadband_min_night,
                                        target_amb_temp_deadband_max_night: v[1] < actions0.target_amb_temp_deadband_max_night ? v[1] : actions0.target_amb_temp_deadband_max_night,
                                    })
                                }} selectedStyle={{ backgroundColor: colors.checked }}
                                    markerStyle={{ backgroundColor: colors.checked }} min={8} max={35} step={1} enableLabel customLabel={renderLabel} />
                            </Center>
                        </SpaceBetween>
                        <SpaceBetween style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <AutoText>target_amb_temp_deadband_night</AutoText>
                            <Center style={{ width: '100%', marginTop: 50 }}>
                                <MultiSlider values={[actions0.target_amb_temp_deadband_min_night, actions0.target_amb_temp_deadband_max_night]} onValuesChangeFinish={(v) => onValuesFinish(['target_amb_temp_deadband_min_night', 'target_amb_temp_deadband_max_night'], v)} selectedStyle={{ backgroundColor: colors.checked }}
                                    markerStyle={{ backgroundColor: colors.checked }} min={actions0.target_amb_temp_min_night} max={actions0.target_amb_temp_max_night} step={1} enableLabel customLabel={renderLabel} />
                            </Center>
                        </SpaceBetween>




                    </View>

                </ShadowCard>
                <ShadowCard style={{ borderWidth: 1, borderColor: '#ddd', width: '30%', paddingHorizontal: 24, marginLeft: '3%', paddingVertical: 16 }}>
                    <SpaceBetween style={{ paddingVertical: 16 }}>
                        <AutoText>hardware</AutoText>
                        <AutoText>{actions1.hardware}</AutoText>
                    </SpaceBetween>
                    <View style={{ marginTop: 8 }}>
                        <SpaceBetween style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <AutoText>target_ec</AutoText>
                            <Center style={{ width: '100%', marginTop: 50 }}>
                                <MultiSlider values={[actions1.target_ec_min, actions1.target_ec_max]} onValuesChangeFinish={(v) => {
                                    updateArr({
                                        target_ec_min: v[0],
                                        target_ec_max: v[1],
                                        target_ec_deadband_min: v[0] > actions1.target_ec_deadband_min ? v[0] : actions1.target_ec_deadband_min,
                                        target_ec_deadband_max: v[1] < actions1.target_ec_deadband_max ? v[1] : actions1.target_ec_deadband_max,
                                    })
                                }} selectedStyle={{ backgroundColor: colors.checked }}
                                    markerStyle={{ backgroundColor: colors.checked }} min={8} max={35} step={1} enableLabel customLabel={renderLabel} />
                            </Center>
                        </SpaceBetween>
                        <SpaceBetween style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <AutoText>target_ec_deadband</AutoText>
                            <Center style={{ width: '100%', marginTop: 50 }}>
                                <MultiSlider values={[actions1.target_ec_deadband_min, actions1.target_ec_deadband_max]} onValuesChangeFinish={(v) => onValuesFinish(['target_ec_deadband_min', 'target_ec_deadband_max'], v)} selectedStyle={{ backgroundColor: colors.checked }}
                                    markerStyle={{ backgroundColor: colors.checked }} min={actions1.target_ec_min} max={actions1.target_ec_max} step={1} enableLabel customLabel={renderLabel} />
                            </Center>
                        </SpaceBetween>

                        <SpaceBetween style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <AutoText>target_ph</AutoText>
                            <Center style={{ width: '100%', marginTop: 50 }}>
                                <MultiSlider values={[actions1.target_ph_min, actions1.target_ph_max]} onValuesChangeFinish={(v) => {
                                    updateArr({
                                        target_ph_min: v[0],
                                        target_ph_max: v[1],
                                        target_ph_deadband_min: v[0] > actions1.target_ph_deadband_min ? v[0] : actions1.target_ph_deadband_min,
                                        target_ph_deadband_max: v[1] < actions1.target_ph_deadband_max ? v[1] : actions1.target_ph_deadband_max,
                                    })
                                }} selectedStyle={{ backgroundColor: colors.checked }}
                                    markerStyle={{ backgroundColor: colors.checked }} min={8} max={35} step={1} enableLabel customLabel={renderLabel} />
                            </Center>
                        </SpaceBetween>
                        <SpaceBetween style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <AutoText>target_ph_deadband</AutoText>
                            <Center style={{ width: '100%', marginTop: 50 }}>
                                <MultiSlider values={[actions1.target_ph_deadband_min, actions1.target_ph_deadband_max]} onValuesChangeFinish={(v) => onValuesFinish(['target_ph_deadband_min', 'target_ph_deadband_max'], v)} selectedStyle={{ backgroundColor: colors.checked }}
                                    markerStyle={{ backgroundColor: colors.checked }} min={actions1.target_ph_min} max={actions1.target_ph_max} step={1} enableLabel customLabel={renderLabel} />
                            </Center>
                        </SpaceBetween>

                        <SpaceBetween style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <AutoText>target_water_temperature</AutoText>
                            <Center style={{ width: '100%', marginTop: 50 }}>
                                <MultiSlider values={[actions1.target_water_temperature_min, actions1.target_water_temperature_max]} onValuesChangeFinish={(v) => {
                                    updateArr({
                                        target_water_temperature_min: v[0],
                                        target_water_temperature_max: v[1],
                                        target_water_temperature_deadband_min: v[0] > actions1.target_water_temperature_deadband_min ? v[0] : actions1.target_water_temperature_deadband_min,
                                        target_water_temperature_deadband_max: v[1] < actions1.target_water_temperature_deadband_max ? v[1] : actions1.target_water_temperature_deadband_max,
                                    })
                                }} selectedStyle={{ backgroundColor: colors.checked }}
                                    markerStyle={{ backgroundColor: colors.checked }} min={12} max={25} step={1} enableLabel customLabel={renderLabel} />
                            </Center>
                        </SpaceBetween>
                        <SpaceBetween style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <AutoText>target_water_temperature_deadband</AutoText>
                            <Center style={{ width: '100%', marginTop: 50 }}>
                                <MultiSlider values={[actions1.target_water_temperature_deadband_min, actions1.target_water_temperature_deadband_max]} onValuesChangeFinish={(v) => onValuesFinish(['target_water_temperature_deadband_min', 'target_water_temperature_deadband_max'], v)} selectedStyle={{ backgroundColor: colors.checked }}
                                    markerStyle={{ backgroundColor: colors.checked }} min={actions1.target_water_temperature_min} max={actions1.target_water_temperature_max} step={1} enableLabel customLabel={renderLabel} />
                            </Center>
                        </SpaceBetween>




                    </View>
                </ShadowCard>
                <ShadowCard style={{ borderWidth: 1, borderColor: '#ddd', width: '30%', paddingHorizontal: 24, marginLeft: '3%', paddingVertical: 16 }}>
                    <SpaceBetween style={{ width: '100%', paddingVertical: 16 }}>
                        <AutoText>hardware</AutoText>
                        <AutoText>{actions2.hardware}</AutoText>
                    </SpaceBetween>
                    <SpaceBetween style={{ width: '100%', paddingVertical: 32 }} onPress={() => openPick1('fade_curve_type', 2)}>
                        <AutoText>fade_curve_type</AutoText>
                        <AutoText style={{ color: colors.checked }}>{actions2.fade_curve_type}</AutoText>
                    </SpaceBetween>
                    <SpaceBetween style={{ width: '100%', paddingVertical: 32 }} onPress={() => openPick1('fade_curve_duration', 3)} disabled={actions2.fade_curve_type === 'none'}>
                        <AutoText>fade_curve_duration</AutoText>
                        <AutoText style={{ color: colors.checked }}>{actions2.fade_curve_duration}</AutoText>
                    </SpaceBetween>
                    <Start style={{ width: '100%', paddingVertical: 32 }}>
                        <AutoText>spectra_450_led</AutoText>
                    </Start>
                    <Center>
                        <AutoText>{actions2.spectra_450_led}</AutoText>
                    </Center>
                    <Slider maximumValue={255} minimumValue={0} onValueChange={(v => updateArr({ 'spectra_450_led': v }))} value={actions2.spectra_450_led} step={1} thumbTintColor={colors.checked} minimumTrackTintColor={colors.checked} />
                    <SpaceBetween style={{ width: '100%', marginBottom: 32 }}>
                        <AutoText>spectra_660_led</AutoText>
                    </SpaceBetween>
                    <Center>
                        <AutoText>{actions2.spectra_660_led}</AutoText>
                    </Center>
                    <Slider maximumValue={255} minimumValue={0} onValueChange={(v => updateArr({ 'spectra_660_led': v }))} value={actions2.spectra_660_led} step={1} thumbTintColor={colors.checked} minimumTrackTintColor={colors.checked} />

                    <SpaceBetween style={{ width: '100%', marginBottom: 32 }}>
                        <AutoText>spectra_main_led</AutoText>
                    </SpaceBetween>
                    <Center>
                        <AutoText>{actions2.spectra_main_led}</AutoText>
                    </Center>
                    <Slider maximumValue={255} minimumValue={0} onValueChange={(v => updateArr({ 'spectra_main_led': v }))} value={actions2.spectra_main_led} step={1} thumbTintColor={colors.checked} minimumTrackTintColor={colors.checked} />


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
        fontSize: 35,
    },
    markerPressed: {
        borderWidth: 2,
        borderColor: '#999',
    },
});

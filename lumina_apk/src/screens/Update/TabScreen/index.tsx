import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import AutoText from "src/components/AutoView/Text";
import SpaceBetween from "src/components/FlexView/SpaceBetween";
import Start from "src/components/FlexView/Start";
import ShadowCard from "src/components/Shadow";
import { adaptationConvert, useInlineStyle } from "src/helpers/style";
import { settings, updateArr } from "../data";
import CusMultiSlider from "./CusMultiSlider";
import CusSlider from "./CusSlider";
import CusTime from "./CusTime";
import CusInputNumber from "./CusInputNumber";
import CusOption from "./CusOption";
import CusTimeAndType from "./CusTimeAndType";
import LocalesText from "src/components/Text";
import { locales } from "src/helpers/localesText";
import colors from "src/constants/colors";
import AutoView from "src/components/AutoView/View";

interface TabScreenProps {
    data: any;
}
export default function TabScreen(props: TabScreenProps) {

    const { actions, days_max, days_min, duration } = props.data;
    const [localUpdate, setLocalUpdate] = useState<any>({
        actions0: actions[0],
        actions1: actions[1],
        actions2: actions[2],
    })
    const { actions0, actions1, actions2 } = localUpdate;


    return (
        <ScrollView style={useInlineStyle({ flex: 1, backgroundColor: colors.themeBgColor, marginRight: 32 })}>
            <Start style={{ padding: 32, paddingVertical: 48 }}>
                <CusInputNumber defaultMinValue={days_min} defaultMaxValue={days_max} />
                <LocalesText languageKey={locales.DaytimeDuration} rightText={duration} />

            </Start>
            <Start style={{ flex: 1, padding: 0, alignItems: 'flex-start' }}>
                <ShadowCard style={{ width: '30%', paddingHorizontal: 24, paddingVertical: 16 }}>
                    <View>
                        <Start style={{ paddingVertical: 16 }}>
                            <LocalesText size={45} languageKey={locales[actions0.hardware]} />
                        </Start>

                    </View>
                    <View style={{ marginTop: 8 }}>
                        <CusMultiSlider title="target_amb_temp_day" min={8} max={35} value={actions0} valueKey={['target_amb_temp_min_day', 'target_amb_temp_max_day']} step={1} onChange={updateArr}>
                            <CusMultiSlider title="target_amb_temp_deadband_day" value={actions0} valueKey={['target_amb_temp_deadband_min_day', 'target_amb_temp_deadband_max_day']} onChange={updateArr} />
                        </CusMultiSlider>

                        <CusMultiSlider title="target_rh_day" min={0.3} max={0.85} unit="%" value={actions0} valueKey={['target_rh_min_day', 'target_rh_max_day']} step={0.01} onChange={updateArr}>
                            <CusMultiSlider title="target_rh_deadband_day" unit="%" value={actions0} valueKey={['target_rh_deadband_min_day', 'target_rh_deadband_max_day']} onChange={updateArr} />
                        </CusMultiSlider>

                        <CusMultiSlider title="target_vpd_day" min={0.3} max={3.5} value={actions0} valueKey={['target_vpd_min_day', 'target_vpd_max_day']} step={0.1} onChange={updateArr}>
                            <CusMultiSlider title="target_vpd_deadband_day" value={actions0} valueKey={['target_vpd_deadband_min_day', 'target_vpd_deadband_max_day']} onChange={updateArr} />
                        </CusMultiSlider>
                        <AutoView style={{ marginBottom: 32 }}>
                            <CusOption label="vpd_priority_day" value={actions0.vpd_priority_day} data={['temp', 'rh']} updateKey={'vpd_priority_day'} />
                        </AutoView>
                        <CusMultiSlider title="target_amb_temp_night" min={8} max={35} value={actions0} valueKey={['target_amb_temp_min_night', 'target_amb_temp_max_night']} step={1} onChange={updateArr}>
                            <CusMultiSlider title="target_amb_temp_deadband_night" value={actions0} valueKey={['target_amb_temp_deadband_min_night', 'target_amb_temp_deadband_max_night']} onChange={updateArr} />
                        </CusMultiSlider>


                        <CusMultiSlider title="target_rh_night" min={0.3} max={0.85} unit='%' value={actions0} valueKey={['target_rh_min_night', 'target_rh_max_night']} step={0.01} onChange={updateArr}>
                            <CusMultiSlider title="target_rh_deadband_night" unit="%" value={actions0} valueKey={['target_rh_deadband_min_night', 'target_rh_deadband_max_night']} onChange={updateArr} />
                        </CusMultiSlider>

                        <CusMultiSlider title="target_vpd_night" min={0.3} max={3.5} value={actions0} valueKey={['target_vpd_min_night', 'target_vpd_max_night']} step={0.1} onChange={updateArr}>
                            <CusMultiSlider title="target_vpd_deadband_night" value={actions0} valueKey={['target_vpd_deadband_min_night', 'target_vpd_deadband_max_night']} onChange={updateArr} />
                        </CusMultiSlider>
                        <AutoView style={{ marginBottom: 32 }}>
                            <CusOption label="vpd_priority_night" value={actions0.vpd_priority_night} data={['temp', 'rh']} updateKey={'vpd_priority_night'} />
                        </AutoView>





                    </View>
                </ShadowCard>
                <ShadowCard style={{ width: '30%', paddingHorizontal: 24, marginLeft: '3%', paddingVertical: 16 }}>
                    <Start style={{ paddingVertical: 16 }}>
                        <LocalesText size={45} languageKey={locales[actions1.hardware]} />
                    </Start>
                    <View style={{ marginTop: 8 }}>
                        <CusMultiSlider title="target_ec" min={8} max={35} value={actions1} valueKey={['target_ec_min', 'target_ec_max']} step={1} onChange={updateArr}>
                            <CusMultiSlider title="target_ec_deadband" value={actions1} valueKey={['target_ec_deadband_min', 'target_ec_deadband_max']} onChange={updateArr} />
                        </CusMultiSlider>
                        <CusMultiSlider title="target_ph" min={2.5} max={8.5} value={actions1} valueKey={['target_ph_min', 'target_ph_max']} step={0.1} onChange={updateArr}>
                            <CusMultiSlider title="target_ph_deadband" value={actions1} valueKey={['target_ph_deadband_min', 'target_ph_deadband_max']} onChange={updateArr} />
                        </CusMultiSlider>
                        <CusMultiSlider title="target_water_temperature" min={12} max={25} value={actions1} valueKey={['target_water_temperature_min', 'target_water_temperature_max']} step={1} onChange={updateArr}>
                            <CusMultiSlider title="target_water_temperature_deadband" value={actions1} valueKey={['target_water_temperature_deadband_min', 'target_water_temperature_deadband_max']} onChange={updateArr} />
                        </CusMultiSlider>
                    </View>
                </ShadowCard>
                <ShadowCard style={{ width: '30%', paddingHorizontal: 24, marginLeft: '3%', paddingVertical: 16 }}>
                    <Start style={{ width: '100%', paddingVertical: 16 }}>

                        <LocalesText size={45} languageKey={locales[actions2.hardware]} />

                    </Start>
                    <CusTimeAndType optionKey="fade_curve_type" timeKey="fade_curve_duration" actions={actions2} />
                    <View style={useInlineStyle({ paddingTop: 16 })}>
                        <CusSlider title="spectra_450_led" updateKey="spectra_450_led" defaultValue={actions2} />
                        <CusSlider title="spectra_660_led" updateKey="spectra_660_led" defaultValue={actions2} />
                        <CusSlider title="spectra_main_led" updateKey="spectra_main_led" defaultValue={actions2} />
                    </View>
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
        fontSize: 35,
    },
    markerPressed: {
        borderWidth: 2,
        borderColor: '#999',
    },
});

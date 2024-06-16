

import { number } from "echarts";
import React, { useEffect, useState } from "react";
import { Alert, Switch, View } from "react-native";
import AutoText from "src/components/AutoView/Text";
import AutoView from "src/components/AutoView/View";
import SpaceBetween from "src/components/FlexView/SpaceBetween";
import { FONT_SIZE } from "src/constants/style";
import { adaptationConvert } from "src/helpers/style";
import ToastService from "src/helpers/toast";
import Slider from '@ptomasroos/react-native-multi-slider'
import colors from "src/constants/colors";
import Center from "src/components/FlexView/Center";
import Start from "src/components/FlexView/Start";
import Slider2 from "@react-native-community/slider";
import { valueToFixed } from "src/utils";


interface CustomSwitchProps {
    disabled?: boolean;
    onChange: (v: any) => void;
    title: string;
    value: number;
    max: number;
    min: number;
    step: number;
    unit: any;
}

const hitShop = {
    left: 30,
    top: 30,
    right: 30,
    bottom: 30,
}

function format(str: any) {
    if (str && str.length >= 2) {
        let unit = str.substring(str.length - 1, str.length);
        if (unit === '%') {
            return Number(str.replace(unit, ''))
        }
    }
    return str;
}

export default function CustomSLider(props: CustomSwitchProps) {
    const { disabled, onChange, value, title, max = 100, min = 0, step = 0.1, unit } = props;

    const [sliderValue, setSilderValue] = useState(0);

    useEffect(() => {
        const _value = Number(format(value));
        if (_value <= min) {
            setSilderValue(min)
        } else {
            setSilderValue(_value)
        }
    }, [value])
    const [cointerWidth, setCointerWidth] = useState(0);

    const _value = Number(sliderValue).toFixed(2);

    function handlePress() {
        onChange(Number(sliderValue).toFixed(2))
    }

    if (typeof min !== 'number' || typeof max !== 'number') {
        return null;
    }
    if (min === 0 && max === 0) {
        return null;
    }


    return (
        <AutoView style={{ flexDirection: 'column', marginVertical: 32 }}>
            <SpaceBetween style={{ paddingBottom: 32 }}>
                <AutoText style={{ fontSize: FONT_SIZE.title }}>{title}</AutoText>
                <Start>
                <AutoText style={{ fontSize: FONT_SIZE.desc, opacity: disabled ? 0.7 : 1 }}>{min} ~ </AutoText>
                <AutoText style={{ fontSize: FONT_SIZE.desc, opacity: disabled ? 0.7 : 1 }}>{max}</AutoText>
                </Start>
            </SpaceBetween>
            <View style={{ opacity: disabled ? 0.7 : 1 }} onLayout={(event) => {
                setCointerWidth(event.nativeEvent.layout.width)
            }}>
                <Slider
                    sliderLength={cointerWidth}
                    min={min}
                    max={max}
                    enabledOne={!disabled}
                    step={step || 1}
                    onValuesChangeFinish={(v) => {
                        if (disabled) {
                            return;
                        }
                        onChange(valueToFixed(v[0], 0))
                    }}
                    values={[sliderValue > min ? sliderValue : min]}
                    markerStyle={{ backgroundColor: colors.checked }}
                    unselectedStyle={{ backgroundColor: '#f1f1f1' }}
                    selectedStyle={{ backgroundColor: disabled ? '#f1f1f1' : colors.checked }}
                />
                <SpaceBetween style={{ paddingTop: 8 }}>
                    <AutoText style={{ fontSize: FONT_SIZE.title }}>{Number(sliderValue).toFixed(0)} {unit}</AutoText>
                </SpaceBetween>
                {/* <Slide minValue={min} maxValue={max} value={sliderValue} unit={unit} disabled={disabled} onfinish={(v)=>{
                 onChange(Number(v).toFixed(2))
            }} /> */}
            </View>

            {/* <Slider2 maximumTrackTintColor="#ccc"
                minimumTrackTintColor={disabled ? '#666' : "#559e18"}
                maximumValue={max}
                disabled={disabled}
                onTouchEnd={handlePress}
                onValueChange={(v) => setSilderValue(v)}
                minimumValue={min}
                step={step}
                hitSlop={hitShop}
                style={{ height: adaptationConvert(20), width: '100%' }}
                thumbTintColor="#559e18"
                value={sliderValue} /> 
             <SpaceBetween style={{paddingTop:16}}>
                <AutoText style={{ fontSize: FONT_SIZE.desc,opacity:disabled?0.7:1 }}>{Number(sliderValue).toFixed(2)} {unit}</AutoText>
                <AutoText style={{ fontSize: FONT_SIZE.desc,opacity:disabled?0.7:1 }}>{max}</AutoText>
            </SpaceBetween> */}

        </AutoView>

    )
}
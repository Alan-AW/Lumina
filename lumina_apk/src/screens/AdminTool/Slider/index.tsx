

import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import { Switch } from "react-native";
import AutoText from "src/components/AutoView/Text";
import AutoView from "src/components/AutoView/View";
import SpaceBetween from "src/components/FlexView/SpaceBetween";
import { FONT_SIZE } from "src/constants/style";


interface CustomSwitchProps {
    disabled?: boolean;
    onChange: (v: any) => void;
    title: string;
    value: number;
    max: number;
    min: number;
    step: number;
    unit:any;
}

function format(str: any) {
    if (str.length >= 2) {
        let unit = str.substring(str.length - 1, str.length);
        if (unit === '%') {
            return Number(str.replace(unit, ''))
        }
    }
    return str;
}

export default function CustomSLider(props: CustomSwitchProps) {
    const { disabled, onChange, value, title, max = 0, min = 0, step = 0.1,unit } = props;
    const [sliderValue, setSilderValue] = useState(Number(format(value)));

    const _value = Number(sliderValue).toFixed(2);

    function handlePress() {
        onChange(Number(sliderValue).toFixed(2))
    }


    return (
        <AutoView style={{ flexDirection: 'column', marginVertical: 64 }}>
            <Slider maximumTrackTintColor="#ccc"
                minimumTrackTintColor={disabled ? '#666' : "#559e18"}
                maximumValue={max}
                disabled={disabled}
                onTouchEnd={handlePress}
                onValueChange={(v) => setSilderValue(v)}
                minimumValue={min}
                step={step}
                style={{ height: 10, width: '100%' }}
                thumbTintColor="#559e18"
                value={sliderValue} />
            <SpaceBetween style={{paddingTop:16}}>
                <AutoText style={{ fontSize: FONT_SIZE.desc,opacity:disabled?0.7:1 }}>{Number(sliderValue).toFixed(2)} {unit}</AutoText>
                <AutoText style={{ fontSize: FONT_SIZE.desc,opacity:disabled?0.7:1 }}>{max}</AutoText>
            </SpaceBetween>

        </AutoView>

    )
}
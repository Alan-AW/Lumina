import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import { View } from "react-native";
import AutoText from "src/components/AutoView/Text";
import SpaceBetween from "src/components/FlexView/SpaceBetween";
import { useInlineStyle } from "src/helpers/style";
import { updateArr } from "../../data";
import colors from "src/constants/colors";
import LocalesText from "src/components/Text";
import { locales } from "src/helpers/localesText";


interface CusSliderProps {
    defaultValue: any;
    title: string;
    updateKey: string;
}

export default function CusSlider(props: CusSliderProps) {
    const { defaultValue, title, updateKey } = props;
    const [sliderValue, setSliderValue] = useState(defaultValue[updateKey]);

    function onChnage(value: number) {
        setSliderValue(value)
        updateArr({ [updateKey]: value })
    }

    return (
        <>
            <SpaceBetween style={{ width: '100%', marginBottom: 32 }}>
                <LocalesText languageKey={locales[title] || title} />
                <AutoText>{sliderValue}</AutoText>
            </SpaceBetween>
            <View style={useInlineStyle({ marginBottom: 32 })}>
                <Slider maximumValue={255} minimumValue={0} onValueChange={onChnage} value={sliderValue} step={1} thumbTintColor={colors.checked} minimumTrackTintColor={colors.checked} />

            </View>
        </>
    )
}
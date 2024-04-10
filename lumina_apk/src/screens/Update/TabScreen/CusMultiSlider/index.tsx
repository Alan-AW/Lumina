import MultiSlider from "@ptomasroos/react-native-multi-slider"
import React, { useEffect, useState } from "react"
import AutoText from "src/components/AutoView/Text"
import Center from "src/components/FlexView/Center"
import SpaceBetween from "src/components/FlexView/SpaceBetween"
import { updateArr } from "../../data"
import colors from "src/constants/colors"
import { View } from "react-native"
import LocalesText from "src/components/Text"
import { locales } from "src/helpers/localesText"

interface CusMultiSliderProps {
    value: any;
    title: string;
    valueKey: string[];
    min?: number;
    max?: number;
    step?: number;
    onChange: (v: any) => void;
    children?: any;
    newValue?: number[];
}

export default function CusMultiSlider(props: CusMultiSliderProps) {
    const { value, valueKey, title, min, max, onChange, step, children, newValue } = props;

    const defaultSliderMinValue = value[valueKey[0]]
    const defaultSliderMaxValue = value[valueKey[1]]
    const [sliderValue, setSliderValue] = useState([defaultSliderMinValue, defaultSliderMaxValue]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [currentMin, setCurrentMin] = useState(min);
    const [currentMax, setCurrentMax] = useState(max);


    useEffect(() => {
        setCurrentMin(min)
    }, [min])
    useEffect(() => {
        setCurrentMax(max)
    }, [max])

    //判断是否需要更新滑动条
    useEffect(() => {
        if (newValue) {
            const _isUpdate = sliderValue[0] < newValue[0] || sliderValue[1] > newValue[1];
            setIsUpdate(_isUpdate)
        }
    }, [newValue, sliderValue])
    useEffect(() => {
        if (isUpdate && newValue) {
            propsChange(newValue)
            setSliderValue(newValue)
        }

    }, [isUpdate])




    function change(v: number[]) {
        propsChange(v)
        setSliderValue(v)
    }

    function propsChange(v: number[]) {
        onChange({
            [valueKey[0]]: v[0],
            [valueKey[1]]: v[1],
        })
    }






    return (
        <View>
            <SpaceBetween style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <LocalesText languageKey={locales[title] || title} />
                <SpaceBetween style={{ width: '100%', paddingTop: 32 }}>
                    <LocalesText languageKey={locales.min} rightText={`：${sliderValue[0]}`} />
                    <LocalesText languageKey={locales.max} rightText={`：${sliderValue[1]}`} />
                </SpaceBetween>
                <Center style={{ width: '100%', marginTop: 0 }}>
                    <MultiSlider values={sliderValue} onValuesChangeFinish={change} selectedStyle={{ backgroundColor: colors.checked }}
                        markerStyle={{ backgroundColor: colors.checked }} min={currentMin} max={currentMax} step={step} />
                </Center>
            </SpaceBetween>
            {children && React.cloneElement(children, { min: sliderValue[0], max: sliderValue[1], newValue: sliderValue, step, })}
        </View>

    )

}
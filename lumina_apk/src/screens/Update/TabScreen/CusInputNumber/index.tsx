import React, { useEffect } from "react";
import { useState } from "react";
import { TextInput } from "react-native";
import Start from "src/components/FlexView/Start";
import colors from "src/constants/colors";
import { adaptationConvert } from "src/helpers/style";
import { updateArr } from "../../data";
import AutoText from "src/components/AutoView/Text";
import LocalesText from "src/components/Text";
import { locales } from "src/helpers/localesText";



interface CusInputNumberProps {
    defaultMinValue: number,
    defaultMaxValue: number,
}
interface InputNumberProps {
    value: number,
    min: number,
    max: number,
    updateKey: string,
    change: (v: number) => void;
}

const InputNumber = (props: InputNumberProps) => {
    const { value, min, max, updateKey, change } = props;
    const [inputValue, setInputValue] = useState<any>(value);

    useEffect(() => {
        setInputValue(value)
    }, [value])



    function onBlur() {
        const _inputValue = Number(inputValue);
        let save_value = _inputValue;
        if (isNaN(_inputValue)) {
            setInputValue(min);
            return;
        }

        if (isNaN(_inputValue) || _inputValue <= min) {
            save_value = min;
            setInputValue(min);
        }

        if (_inputValue >= max) {
            save_value = max;
            setInputValue(max);
        }
        change(save_value)
        updateArr({ [updateKey]: save_value })
    }

    return (
        <TextInput keyboardType='numeric' value={`${inputValue}`}
            onBlur={onBlur}
            onChangeText={setInputValue}
            style={{ borderBottomWidth: 1, borderColor: '#ddd', height: '100%', padding: 0, textAlign: 'center', color: colors.checked, width: adaptationConvert(150) }} />

    )
}

export default function CusInputNumber(props: CusInputNumberProps) {
    const { defaultMinValue, defaultMaxValue } = props;

    const [minValue, setMinValue] = useState(defaultMinValue)
    const [maxValue, setMaxValue] = useState(defaultMaxValue)

    return (
        <Start>
            <Start style={{ marginRight: 32 }}>
                <LocalesText languageKey={locales.days_min} style={{ paddingRight: 32 }} />
                <InputNumber value={minValue} min={1} max={maxValue} change={setMinValue} updateKey="days_min" />
            </Start>
            <Start style={{ marginRight: 32 }}>
                <LocalesText languageKey={locales.days_max} style={{ paddingRight: 32 }} />
                <InputNumber value={maxValue} min={minValue} max={30} change={setMaxValue} updateKey="days_max" />
            </Start>
        </Start>
    )


}
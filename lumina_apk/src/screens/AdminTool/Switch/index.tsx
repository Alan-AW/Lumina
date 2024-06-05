

import React from "react";
import { Switch } from "react-native";
import AutoText from "src/components/AutoView/Text";
import End from "src/components/FlexView/End";
import SpaceBetween from "src/components/FlexView/SpaceBetween";
import Start from "src/components/FlexView/Start";
import LocalesText from "src/components/Text";
import { FONT_SIZE } from "src/constants/style";
import { locales } from "src/helpers/localesText";
import { useInlineStyle } from "src/helpers/style";


interface CustomSwitchProps {
    disabled?: boolean;
    onChange: (v: any) => void;
    title: string;
    value: boolean;
    cmdIndex: boolean;
}

export default function CustomSwitch(props: CustomSwitchProps) {
    const { disabled, onChange, value, title, cmdIndex } = props;
    function handlePress() {
        onChange(!value)
    }
    return (
        <SpaceBetween>
            <AutoText style={{ fontSize: FONT_SIZE.title }}>{title}</AutoText>
            {
                cmdIndex &&
                <Start>
                    <LocalesText languageKey={value ? locales.automatic : locales.Manual} style={{ paddingRight: 12 }} />
                    <Switch
                        thumbColor={value ? '#fff' : '#757575'} trackColor={{ false: '#e1e1e1', true: disabled ? '#ccc' : '#a5ce77' }} disabled={disabled} value={value} onChange={handlePress} />

                </Start>
            }

        </SpaceBetween>
    )
}
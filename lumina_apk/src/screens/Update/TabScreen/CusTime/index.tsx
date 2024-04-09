import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import Start from "src/components/FlexView/Start";
import PickTime from "src/components/PickTime";
import { updateArr } from "../../data";
import AutoText from "src/components/AutoView/Text";
import colors from "src/constants/colors";
import SpaceBetween from "src/components/FlexView/SpaceBetween";


interface CusTimeProps {

    label: string;
    value: string;
    maxHour: number;
    updateKey: string;
    isSpan?: boolean;
    disabled?: boolean

}


export default function CusTime(props: CusTimeProps) {
    const { label, value, maxHour, updateKey, isSpan = false, disabled = false } = props;
    const [time, setTime] = useState(value);
    const openRef = useRef<any>(null);
    console.log('接收到的value', value);

    useEffect(() => {
        if (disabled) {
            setTime('00:00:00')
        }
    }, [disabled])


    function onChange(changeValue: string) {
        setTime(changeValue)
        updateArr({ [updateKey]: changeValue })
    }

    if (isSpan) {
        return (
            <>

                <SpaceBetween disabled={disabled} style={{ paddingVertical: 32, width: '100%' }} onPress={() => openRef.current.open()}>
                    <AutoText>{label}</AutoText>
                    <AutoText style={{ color: colors.checked }}>{time}</AutoText>

                </SpaceBetween>
                <PickTime ref={openRef} maxHour={maxHour} data={time} onChange={onChange} />
            </>

        )
    }

    return (
        <>

            <Start onPress={() => openRef.current.open()}>
                <AutoText>{label}：<AutoText style={{ color: colors.checked }}>{time}</AutoText></AutoText>

            </Start>
            <PickTime ref={openRef} maxHour={maxHour} data={time} onChange={onChange} />
        </>

    )
}
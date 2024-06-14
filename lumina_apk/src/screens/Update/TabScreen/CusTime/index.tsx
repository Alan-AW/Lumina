import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import Start from "src/components/FlexView/Start";
import PickTime from "src/components/PickTime";
import { updateArr } from "../../data";
import AutoText from "src/components/AutoView/Text";
import colors from "src/constants/colors";
import SpaceBetween from "src/components/FlexView/SpaceBetween";
import LocalesText from "src/components/Text";
import { locales } from "src/helpers/localesText";
import { FONT_SIZE } from "src/constants/style";


interface CusTimeProps {

    label: any;
    value: string;
    maxHour: number;
    updateKey: string;
    isSpan?: boolean;
    disabled?: boolean;
    isSec?: boolean;
    onChangeSelect?:(value:string)=>void;

}


export default function CusTime(props: CusTimeProps) {
    const { label, value, maxHour, updateKey, isSpan = false, disabled = false,onChangeSelect,isSec=true } = props;
    const [time, setTime] = useState(value);
    const openRef = useRef<any>(null);
    console.log('接收到的value', value);

    useEffect(() => {
        if (disabled) {
            setTime('00:00:00')
        }
    }, [disabled])


    function onChange(changeValue: string) {
        if(onChangeSelect){
            onChangeSelect(changeValue)
        }else{
            updateArr({ [updateKey]: changeValue })
        }
        setTime(changeValue)

       
    }

    if (isSpan) {
        return (
            <>

                <SpaceBetween disabled={disabled} style={{ paddingVertical: 32, width: '100%' }} onPress={() => openRef.current.open()}>
                    <LocalesText languageKey={locales[label] || label} />
                    <AutoText style={{ color: colors.checked,fontSize:FONT_SIZE.subTitle }}>{time}</AutoText>

                </SpaceBetween>
                <PickTime ref={openRef} isSec={isSec} maxHour={maxHour} data={time} onChange={onChange} />
            </>

        )
    }

    return (
        <>

            <Start onPress={() => openRef.current.open()}>
                <AutoText style={{fontSize:FONT_SIZE.subTitle}}>{label}：<AutoText style={{ color: colors.checked,fontSize:FONT_SIZE.subTitle }}>{time}</AutoText></AutoText>

            </Start>
            <PickTime ref={openRef} maxHour={maxHour} isSec={isSec} data={time} onChange={onChange} />
        </>

    )
}
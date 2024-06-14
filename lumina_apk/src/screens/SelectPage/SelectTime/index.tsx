import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import Start from "src/components/FlexView/Start";
import PickTime from "src/components/PickTime";
import AutoText from "src/components/AutoView/Text";
import colors from "src/constants/colors";
import SpaceBetween from "src/components/FlexView/SpaceBetween";
import LocalesText from "src/components/Text";
import { locales } from "src/helpers/localesText";
import { FONT_SIZE } from "src/constants/style";
import PickTimeDivision from "src/components/PickTime/PickTimeDivision";


interface CusTimeProps {

    label: any;
    value: string;
    maxHour: number;
    isSpan?: boolean;
    disabled?: boolean;
    onChangeSelect?:(value:string)=>void;

}


export default function SelectTime(props: CusTimeProps) {
    const { label, value, maxHour, isSpan = false, disabled = false,onChangeSelect } = props;
    const [time, setTime] = useState(value);
    const openRef = useRef<any>(null);
    console.log('接收到的value', value);

    // useEffect(() => {
    //     if (disabled) {
    //         setTime('00:00:00')
    //     }
    // }, [disabled])


    function onChange(changeValue: string) {
        if(onChangeSelect){
            onChangeSelect(changeValue)
        }
        setTime(changeValue)

       
    }



    return (
        <>

            <Start onPress={() => openRef.current.open()}>
                <AutoText style={{fontSize:FONT_SIZE.title}}>{label}：<AutoText style={{ color: colors.checked,fontSize:FONT_SIZE.subTitle }}>{time}</AutoText></AutoText>

            </Start>
            <PickTimeDivision ref={openRef} maxHour={maxHour} data={time} onChange={onChange} />
        </>

    )
}
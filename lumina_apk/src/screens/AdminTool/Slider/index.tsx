

import { number } from "echarts";
import React, { useEffect, useState } from "react";
import { Alert, Switch, View } from "react-native";
import AutoText from "src/components/AutoView/Text";
import AutoView from "src/components/AutoView/View";
import SpaceBetween from "src/components/FlexView/SpaceBetween";
import { FONT_SIZE } from "src/constants/style";
import { adaptationConvert } from "src/helpers/style";
import ToastService from "src/helpers/toast";
// import Slider from '@ptomasroos/react-native-multi-slider'
import colors from "src/constants/colors";
import Center from "src/components/FlexView/Center";
import Start from "src/components/FlexView/Start";
import Slider2 from "@react-native-community/slider";
import {Slider} from '@miblanchard/react-native-slider';
import { valueToFixed } from "src/utils";
import { scale } from "@shopify/react-native-skia";


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
// const step=1; //因精度问题，这里只能设置整数
export default function CustomSLider(props: CustomSwitchProps) {
    const { disabled, onChange, value, title, max = 100, min = 0, unit,step=1 } = props;

    const [sliderValue, setSilderValue] = useState<number>(0);
    const [enableLabel, setEnableLabel] = useState(false);
    

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
            <View  onLayout={(event) => {
                setCointerWidth(event.nativeEvent.layout.width)
            }}>
                <Slider
                animateTransitions
                animationType="timing"
                value={sliderValue}
                minimumValue={min}
                disabled={disabled}
                maximumValue={max}
                step={step}
                minimumTrackTintColor={disabled?'#ccc':colors.checked}
                maximumTrackTintColor="#f1f1f1"
                thumbTintColor={disabled?'#ccc':colors.checked}
                onSlidingComplete={(v)=>{
                    onChange(v[0])
                    setSilderValue(v[0])
                }}
                />
                {/* <Slider2
                minimumValue={min}
                onResponderGrant={()=>{
                    return <View style={{width:100,height:100,backgroundColor:'#ccc'}} />
                }}
                maximumValue={max}
                
                disabled={disabled}
                minimumTrackTintColor={colors.checked}
                thumbTintColor={colors.checked}
                style={{
                    transform: [{ scaleX: .75 }, { scaleY: .75 }]
                }}
                // style={{transform:[{scale:1.2}]}}
                onTouchEnd={(v)=>{
                    onChange(v)
                }}
                value={sliderValue}
                /> */}
                {/* <Slider
                    sliderLength={cointerWidth}
                    min={min}
                    max={max+1}
                    enabledOne={!disabled}
                    step={step}
                    enableLabel={enableLabel}

                    onValuesChangeStart={()=>{
                        if (disabled) {
                            return;
                        }
                        setEnableLabel(true)
                    }}
                    onValuesChangeFinish={(v) => {
                        
                        if (disabled) {
                            return;
                        }
                        setEnableLabel(false)
                        let dragValue=valueToFixed(v[0], 0);
                        if(dragValue>=max){
                            dragValue=max
                        }
                        onChange(dragValue)
                    }}
                    values={[sliderValue > min ? sliderValue : min]}
                    markerStyle={{ backgroundColor: colors.checked }}
                    unselectedStyle={{ backgroundColor: '#f1f1f1' }}
                    selectedStyle={{ backgroundColor: disabled ? '#f1f1f1' : colors.checked }}
                /> */}
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
import Slider from "@react-native-community/slider";
import React, { useEffect, useState } from "react";
import { Switch } from 'react-native'
import AutoView from "src/components/AutoView/View";
import AutoText from "src/components/AutoView/Text";
import { submitAdmin } from "src/apis/home";
import ToastService from "src/helpers/toast";


const AUTO_TYPE = 'AUTO_TYPE'
const SLIDER_TYPE = 'SLIDER_TYPE'

function format(str) {
    if (str.length >= 2) {
        let unit = str.substring(str.length - 1, str.length);
        if (unit === '%') {
            return Number(str.replace(unit, ''))
        }

    }

    return str;
}


const ControllerItem = (props) => {
    const { item = {}, onChange } = props;
    const [auto, setAuto] = useState(item.auto);
    const [sliderValue, setSilderValue] = useState(Number(format(item.value)));
    const minValue = Number(format(item.min_value));
    const maxValue = Number(format(item.max_value));
    const step = Number(item.step);
    console.log({
        value:Number(format(item.value)),
        desc:item.desc,
        minValue,
        maxValue,
    });
    // useEffect(() => {
    //     const value = Number(item.value)
    //     if (typeof sliderValue === 'string' && item.value && isNaN(value)) {
    //         setSilderValue(value);
    //     }
    // }, [sliderValue, item.value])

    // console.log(6666);

    // useEffect(() => {
    //     debounce(onChange({
    //         ...item,
    //         auto,
    //         value: sliderValue,

    //     }), 2000
    //     )

    // }, [auto, sliderValue])


    function submit(item, callback) {
        submitAdmin({ id: 1, data: [item] }).then(res => {
            console.log("请求结果", res);
            if (res.code == 200) {
                if (res.errs) {
                    ToastService.showToast(res.errs);
                    return;
                }
                if (callback) {
                    callback()

                }
            }

        }).catch(err => {
            ToastService.showToast('请求失败');
            console.log('请求参数', { data: [item] });
        })
    }


    const _value=Number(sliderValue).toFixed(2);


    return (
        <AutoView style={{ height: 150, paddingLeft: 32, paddingRight: 32, marginBottom: 20 }}>
            <AutoView isRow style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <AutoText>{item.desc}</AutoText>
                <AutoView>
                    <Switch thumbColor={auto ? '#fff' : '#757575'}
                        trackColor={{ false: '#e1e1e1', true: '#a5ce77' }} onChange={(value) => {
                            submit({
                                auto: !auto,
                                cmd: item.cmd,
                                value:  item.max_value.indexOf('%')>=0?_value+'%':_value,
                            }, () => {
                                setAuto(!auto)
                            });


                        }} value={auto} />
                </AutoView>
            </AutoView>
            <AutoView style={{ height: 60, alignItems: 'center', justifyContent: 'center', }}>
                <Slider maximumTrackTintColor="#ccc"
                    minimumTrackTintColor={auto ? '#666' : "#559e18"}
                    maximumValue={!isNaN(maxValue) ? maxValue : 0}
                    disabled={auto}
                    onTouchEnd={() => {
                        submit({
                            auto,
                            cmd: item.cmd,
                            value:  item.max_value.indexOf('%')>=0?_value+'%':_value,
                        })
                    }}
                    onValueChange={(v) => setSilderValue(v)}
                    minimumValue={!isNaN(minValue) ? minValue : 0}
                    step={!isNaN(step) ? step : 0.1}
                    style={{ height: 10, width: '100%' }}
                    thumbTintColor="#559e18"

                    value={sliderValue} />

            </AutoView>
            <AutoView isRow style={{ justifyContent: 'space-between' }}>
                <AutoText >{Number(sliderValue).toFixed(2)} {item.unit}</AutoText>
                <AutoText >{maxValue}</AutoText>
            </AutoView>
        </AutoView>
    )

}

export default ControllerItem;


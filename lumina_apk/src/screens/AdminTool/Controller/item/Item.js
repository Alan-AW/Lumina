import Slider from "@react-native-community/slider";
import React, { useEffect, useState } from "react";
import { Switch } from 'react-native'
import AutoView from "src/components/AutoView/View";
import AutoText from "src/components/AutoView/Text";
import { submitAdmin } from "src/apis/home";
import ToastService from "src/helpers/toast";


const AUTO_TYPE = 'AUTO_TYPE'
const SLIDER_TYPE = 'SLIDER_TYPE'

function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}


const ControllerItem = (props) => {
    const { item = {}, onChange } = props;
    const [auto, setAuto] = useState(false);
    const [sliderValue, setSilderValue] = useState('');
    useEffect(() => {
        const value = Number(item.value)
        if (typeof sliderValue === 'string' && item.value && isNaN(value)) {
            setSilderValue(value);
        }
    }, [sliderValue, item.value])

    // console.log(6666);

    useEffect(() => {
        debounce(onChange({
            ...item,
            auto,
            value: sliderValue,

        }), 2000
        )

    }, [auto, sliderValue])
    const minValue = Number(item.min_value);
    const maxValue = Number(item.max_value);
    const step = Number(item.step);

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




    return (
        <AutoView style={{ height: 150, paddingLeft: 32, paddingRight: 32, marginBottom: 20 }}>
            <AutoView isRow style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <AutoText>{item.desc}</AutoText>
                <AutoView>
                    <Switch thumbColor={auto ? '#fff' : '#757575'}
                        trackColor={{ false: '#e1e1e1', true: '#a5ce77' }} onChange={(value) => setAuto(!auto)} value={auto} />
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
                            value: sliderValue,
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


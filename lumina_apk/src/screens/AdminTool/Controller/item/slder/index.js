import Slider from "@react-native-community/slider";
import React, { useEffect, useState } from "react";
import { Switch } from 'react-native'
import AutoView from "src/components/AutoView/View";
import AutoText from "src/components/AutoView/Text";
import { submitAdmin } from "src/apis/home";
import ToastService from "src/helpers/toast";
// import { locales } from "src/helpers/localesText";
import { FONT_SIZE } from "src/constants/style";


function format(str) {
    if (str && str.length >= 2) {
        let unit = str.substring(str.length - 1, str.length);
        if (unit === '%') {
            return Number(str.replace(unit, ''))
        }
    }
    return str;
}


const SliderItem = (props) => {
    const { item = {}, onChange,itemData } = props;
    const [auto, setAuto] = useState(item.auto);
    const [sliderValue, setSilderValue] = useState(Number(format(item.value)));
    const minValue = Number(format(item.min_value));
    const maxValue = Number(format(item.max_value));
    const step = Number(item.step);
    // console.log({
    //     value:Number(format(item.value)),
    //     desc:item.desc,
    //     minValue,
    //     maxValue,
    // });
    // useEffect(() => {



    function submit(item, callback) {
        console.log('请求参数',item);
        onChange(item,callback)
        // submitAdmin({ id: 1, data: [item] }).then(res => {
        //     if (res.code == 200) {
        //         if (res.errs) {
        //             ToastService.showToast(locales.operationFailed);
        //             return;
        //         }
        //         if (callback) {
        //             callback()

        //         }
        //     }

        // })
    }


    const _value=Number(sliderValue).toFixed(2);
    //判断禁用条件
    const findItem=itemData.find(i=>i.cmd__cmd==='spectra' && i.auto===false)
    



    return (
        <AutoView style={{  paddingLeft: 16, paddingRight: 32, marginBottom: 20 }}>
            <AutoView isRow style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <AutoText style={{fontSize:FONT_SIZE.title}}>{item.desc}</AutoText>
                <AutoView>
                    <Switch  thumbColor={auto ? '#fff' : '#757575'}
                        trackColor={{ false: '#e1e1e1', true: '#a5ce77' }} onChange={(value) => {
                            submit({
                                auto: !auto,
                                cmd__cmd: item.cmd__cmd,
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
                    disabled={auto || !findItem}
                    onTouchEnd={() => {
                        submit({
                            auto,
                            cmd__cmd: item.cmd__cmd,
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
                <AutoText style={{fontSize:FONT_SIZE.desc}}>{Number(sliderValue).toFixed(2)} {item.unit}</AutoText>
                <AutoText style={{fontSize:FONT_SIZE.desc}}>{maxValue}</AutoText>
            </AutoView>
        </AutoView>
    )

}

export default SliderItem;


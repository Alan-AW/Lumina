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

const SwitchItem=(props)=>{
    const { item = {}, onChange } = props;
    const [auto, setAuto] = useState(item.auto);
    const [value, setValue] = useState(!!item.value);

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
        <AutoView style={{ height: 150, paddingLeft: 16, paddingRight: 32, marginBottom: 20 }}>
            <AutoView isRow style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <AutoText>{item.desc}</AutoText>
                <AutoView>
                    <Switch thumbColor={auto ? '#fff' : '#757575'}
                        trackColor={{ false: '#e1e1e1', true: '#a5ce77' }} onChange={(value) => {
                            submit({
                                auto: !auto,
                                cmd: item.cmd,
                                value,
                            }, () => {
                                setAuto(!auto)
                            });


                        }} value={auto} />
                </AutoView>
            </AutoView>
            <AutoView style={{ height: 100, alignItems: 'center', justifyContent: 'space-between', }} isRow>
                <AutoText>测试</AutoText>
            <Switch thumbColor={value ? '#fff' : '#757575'}
                        trackColor={{ false: '#e1e1e1', true: '#a5ce77' }} onChange={(value) => {
                            submit({
                                auto,
                                cmd: item.cmd,
                                value:  !value?'1':'0',
                            }, () => {
                                console.log('设置子组件值',123);
                                setValue(!!value)
                            });


                        }} value={!!value} />

            </AutoView>
            {/* <AutoView isRow style={{ justifyContent: 'space-between' }}>
                <AutoText >{Number(sliderValue).toFixed(2)} {item.unit}</AutoText>
                <AutoText >{maxValue}</AutoText>
            </AutoView> */}
        </AutoView>
    )


}



export default SwitchItem;


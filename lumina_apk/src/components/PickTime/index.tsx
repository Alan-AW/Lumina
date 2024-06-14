import React, { useImperativeHandle, forwardRef, useState, useRef, useEffect } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import Center from "../FlexView/Center";
import Start from "../FlexView/Start";
import AutoText from "../AutoView/Text";
import DynamicallySelectedPicker from 'react-native-dynamically-selected-picker';
import End from "../FlexView/End";
import colors from "src/constants/colors";
import { adaptationConvert } from "src/helpers/style";
import LocalesText from "../Text";
import { locales } from "src/helpers/localesText";
import AutoView from "../AutoView/View";

interface PickModalProps {
    data: string;
    maxHour?: number;
    isSec?:boolean;
    onChange: (v: any) => void;
}

const PICK_TIME_SIZE = adaptationConvert(600);

function getMinDuration() {
    return [... new Array(60)].map((i, index: number) => {
        const _time = index < 10 ? `0${index}` : index
        return {
            label: `${_time}`,
            value: `${_time}`
        }
    })
}

function getHour(maxHour: number) {
    return [... new Array(24)].map((i, index: number) => {
        const _time = index < 10 ? `0${index}` : index
        return {
            label: `${_time}`,
            value: `${_time}`
        }
    })
}




function PickTime(props: PickModalProps, ref: any) {

    const [open, setOpen] = useState(false)
    const { onChange, data, maxHour = 24,isSec=true } = props;
    const hour: any = getHour(maxHour)
    const min: any = getMinDuration();
    const sec: any = getMinDuration();
    const defaultValue = formatTime(data)

    const [hourIndex, setHourIndex] = useState(1);
    const [minIndex, setMinIndex] = useState(1);
    const [secIndex, setSecIndex] = useState(1);

    useEffect(()=>{
        setHourIndex(defaultValue.hour)
    },[defaultValue.hour])

    useEffect(()=>{
        setMinIndex(defaultValue.min)
    },[defaultValue.min])

    useEffect(()=>{
        setSecIndex(defaultValue.sec)
    },[defaultValue.sec])


  

    useImperativeHandle(ref, () => {
        return {
            open: () => setOpen(true),
            close: () => setOpen(false),
        }

    }, [])



    function formatTime(str: string) {
        const _arr = str.split(":");

        const findHourIndex = hour.findIndex((i: any) => i.value == _arr[0])
        const findMinIndex = min.findIndex((i: any) => {
            return i.value == _arr[1]

        })
        const findSecIndex = sec.findIndex((i: any) => i.value == _arr[2])
        return {
            hour: findHourIndex,
            min: findMinIndex,
            sec: findSecIndex,
        }
    }

    function close() {
        setOpen(false)
    }

    function change() {

        // console.log(hourIndex, minIndex, secIndex);
        // console.log(hour[hourIndex], min[minIndex], sec[secIndex]);
        
        const value = `${hour[hourIndex].value}:${min[minIndex].value}:${sec[secIndex].value}`
        const nullSec = `${hour[hourIndex].value}:${min[minIndex].value}`
        onChange(isSec?value:nullSec)
        close()
    }



    return (
        <Modal visible={open} transparent style={{ position: 'relative' }} onRequestClose={close}>
            <TouchableOpacity style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', zIndex: 99, backgroundColor: 'rgba(0,0,0,0.3)' }} />

            {
                open && <Center style={{ position: 'relative', zIndex: 100, flexDirection: 'column', flex: 1 }}>
                    <AutoView style={{ backgroundColor: '#fff',borderRadius:8,paddingVertical:16}}>
                    <Start style={{ position: 'relative', paddingBottom: 0 }}>
                        <View>
                            <DynamicallySelectedPicker
                                items={hour}
                                onScroll={({ index }) => setHourIndex(index)}
                                onMomentumScrollBegin={({ index }) => setHourIndex(index)}
                                onMomentumScrollEnd={({ index }) => setHourIndex(index)}
                                onScrollBeginDrag={({ index }) => setHourIndex(index)}
                                onScrollEndDrag={({ index }) => setHourIndex(index)}
                                initialSelectedIndex={hourIndex}
                                height={PICK_TIME_SIZE}
                                width={PICK_TIME_SIZE}
                            />
                        </View>
                        <View >
                            <DynamicallySelectedPicker
                                items={min}
                                onScroll={({ index }) => setMinIndex(index)}
                                onMomentumScrollBegin={({ index }) => setMinIndex(index)}
                                onMomentumScrollEnd={({ index }) => setMinIndex(index)}
                                onScrollBeginDrag={({ index }) => setMinIndex(index)}
                                onScrollEndDrag={({ index }) => setMinIndex(index)}
                                initialSelectedIndex={minIndex}
                                height={PICK_TIME_SIZE}
                                width={PICK_TIME_SIZE}
                            />
                        </View>
                        <View style={{ position: 'relative' }}>
                            {
                                isSec &&   <DynamicallySelectedPicker
                                items={sec}
                                onScroll={({ index }) => setSecIndex(index)}
                                onMomentumScrollBegin={({ index }) => setSecIndex(index)}
                                onMomentumScrollEnd={({ index }) => setSecIndex(index)}
                                onScrollBeginDrag={({ index }) => setSecIndex(index)}
                                onScrollEndDrag={({ index }) => setSecIndex(index)}
                                initialSelectedIndex={secIndex}
                                height={PICK_TIME_SIZE}
                                width={PICK_TIME_SIZE}
                            />
                            }
                          
                         
                        </View>
                     

                    </Start>
                    <End style={{}}>
                                <TouchableOpacity onPress={close} style={{paddingHorizontal:12,paddingVertical:8}}>
                                    <LocalesText languageKey={locales.cancel} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginHorizontal: 16,paddingHorizontal:12,paddingVertical:8 }} onPress={change}>
                                <LocalesText languageKey={locales.confirm} style={{ color: colors.checked }} />
                                </TouchableOpacity>
                            </End>

                    </AutoView>
                  
                </Center>
            }


        </Modal >
    )
}

export default forwardRef(PickTime)
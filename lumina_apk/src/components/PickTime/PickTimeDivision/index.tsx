import React, { useImperativeHandle, forwardRef, useState, useRef, useEffect } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import DynamicallySelectedPicker from 'react-native-dynamically-selected-picker';
import colors from "src/constants/colors";
import { adaptationConvert } from "src/helpers/style";
import { locales } from "src/helpers/localesText";
import Center from "src/components/FlexView/Center";
import Start from "src/components/FlexView/Start";
import End from "src/components/FlexView/End";
import LocalesText from "src/components/Text";
import AutoView from "src/components/AutoView/View";

interface PickModalProps {
    data: string;
    maxHour?: number;
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




function PickTimeDivision(props: PickModalProps, ref: any) {

    const [open, setOpen] = useState(false)
    const { onChange, data, maxHour = 24 } = props;
    const hour: any = getHour(maxHour)
    const min: any = getMinDuration();
    const sec: any = getMinDuration();
    const defaultValue = formatTime(data)

    const [hourIndex, setHourIndex] = useState(1);
    const [minIndex, setMinIndex] = useState(1);
    const [secIndex, setSecIndex] = useState(1);

    useEffect(() => {
        setHourIndex(defaultValue.hour)
    }, [defaultValue.hour])

    useEffect(() => {
        setMinIndex(defaultValue.min)
    }, [defaultValue.min])

    useEffect(() => {
        setSecIndex(defaultValue.sec)
    }, [defaultValue.sec])




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

        const value = `${hour[hourIndex].value}:${min[minIndex].value}`
        onChange(value)
        close()
    }



    return (
        <Modal visible={open} transparent style={{ position: 'relative' }} onRequestClose={close}>
            <TouchableOpacity style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', zIndex: 99, backgroundColor: 'rgba(0,0,0,0.3)' }} />

            {
                open && <Center style={{ position: 'relative', zIndex: 100, flexDirection: 'column', flex: 1 }}>
                    <AutoView style={{ backgroundColor: '#fff', paddingVertical:12,borderRadius:8}}>
                        <Start style={{position: 'relative', paddingBottom: 0 }}>
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



                        </Start>
                        <View style={{ position: 'relative' }}>
                            <End >
                                <TouchableOpacity onPress={close} style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
                                    <LocalesText languageKey={locales.cancel} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginHorizontal: 16, paddingHorizontal: 12, paddingVertical: 8 }} onPress={change}>
                                    <LocalesText languageKey={locales.confirm} style={{ color: colors.checked }} />
                                </TouchableOpacity>
                            </End>
                        </View>
                    </AutoView>



                </Center>
            }


        </Modal >
    )
}

export default forwardRef(PickTimeDivision)
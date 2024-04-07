import React, { useImperativeHandle, forwardRef, useState, useRef, useEffect } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import Center from "../FlexView/Center";
import Start from "../FlexView/Start";
import AutoText from "../AutoView/Text";
import DynamicallySelectedPicker from 'react-native-dynamically-selected-picker';
import End from "../FlexView/End";
import colors from "src/constants/colors";
import { adaptationConvert } from "src/helpers/style";

interface PickModalProps {
    data: string;
    onChange: (v: any) => void;
}

const PICK_TIME_SIZE = adaptationConvert(600);

function getMinDuration() {
    return [... new Array(60)].map((i, index: number) => {
        const _time = index < 10 ? `0${index}` : index
        return {
            label: _time,
            value: _time
        }
    })
}

const hour: any = [
    {
        value: '00',
        label: '0'
    },
    {
        value: '01',
        label: '1'
    },
    {
        value: '02',
        label: '2'
    },
]

const min: any = getMinDuration();
const sec: any = getMinDuration();

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


function PickTime(props: PickModalProps, ref: any) {

    const [open, setOpen] = useState(false)
    const { onChange, data } = props;
    const defaultValue = formatTime(data)
    const [hourIndex, setHourIndex] = useState(defaultValue.hour);
    const [minIndex, setMinIndex] = useState(defaultValue.min);
    const [secIndex, setSecIndex] = useState(defaultValue.sec);

    useEffect(() => {

    },)

    useImperativeHandle(ref, () => {
        return {
            open: () => setOpen(true),
            close: () => setOpen(false),
        }

    }, [])

    function close() {
        setOpen(false)
    }

    function change() {

        const value=`${hour[hourIndex].value}:${min[minIndex].value}:${sec[secIndex].value}`
        onChange(value)
        close()
    }



    return (
        <Modal visible={open} transparent style={{ position: 'relative' }} onRequestClose={close}>
            <TouchableOpacity style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', zIndex: 99, backgroundColor: 'rgba(0,0,0,0.3)' }} />

            <Center style={{ position: 'relative', zIndex: 100, flexDirection: 'column', flex: 1 }}>
                <Start style={{ backgroundColor: '#fff', position: 'relative', paddingBottom: 70 }}>
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
                        <DynamicallySelectedPicker
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
                        <End style={{ width: '100%', position: 'absolute', bottom: -32, left: 0 }}>
                            <TouchableOpacity onPress={close}>
                                <AutoText>取消</AutoText>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginHorizontal: 32 }} onPress={change}>
                                <AutoText style={{ color: colors.checked }}>确定</AutoText>
                            </TouchableOpacity>
                        </End>
                    </View>

                </Start>

            </Center>

        </Modal >
    )
}

export default forwardRef(PickTime)
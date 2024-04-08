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
    startIndex: number;
    endIndex:number;
    value:number;
    onChange: (v: any) => void;
}

const PICK_TIME_SIZE = adaptationConvert(600);

function getMinDuration() {
    return [... new Array(30)].map((i, index: number) => {
        const _time = index < 10 ? `0${index}` : index
        return {
            label: _time,
            value: _time
        }
    })
}

const data: any = getMinDuration();

function formatTime(str: string) {
   
}


function PickRegion(props: PickModalProps, ref: any) {

    const [open, setOpen] = useState(false)
    const { onChange, startIndex,endIndex,value=1 } = props;
    const pickData = JSON.parse(JSON.stringify(data)).splice(startIndex,endIndex);

 

    const [selectIndex, setSelectIndex] = useState(0);

   

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
       console.log(pickData[selectIndex]);
       
       // const value=`${hour[hourIndex].value}:${min[minIndex].value}:${sec[secIndex].value}`
        // onChange(value)
        // close()
    }

    console.log(pickData,'pickData');
    


    return (
        <Modal visible={open} transparent style={{ position: 'relative' }} onRequestClose={close}>
            <TouchableOpacity style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', zIndex: 99, backgroundColor: 'rgba(0,0,0,0.3)' }} />

            <Center style={{ position: 'relative', zIndex: 100, flexDirection: 'column', flex: 1 }}>
                <Start style={{ backgroundColor: '#fff', position: 'relative', paddingBottom: 70 }}>
                    <View>
                        <DynamicallySelectedPicker
                            items={[]}
                            // onScroll={({ index }) => setSelectIndex(index)}
                            // onMomentumScrollBegin={({ index }) => setSelectIndex(index)}
                            // onMomentumScrollEnd={({ index }) => setSelectIndex(index)}
                            // onScrollBeginDrag={({ index }) => setSelectIndex(index)}
                            // onScrollEndDrag={({ index }) => setSelectIndex(index)}
                            // initialSelectedIndex={1}
                            height={200}
                            width={200}
                        />
                    </View>

                </Start>

            </Center>

        </Modal >
    )
}

export default forwardRef(PickRegion)
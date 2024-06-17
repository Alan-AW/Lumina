import React, { useImperativeHandle, forwardRef, useState } from "react";
import { Modal, TouchableOpacity } from "react-native";
import Center from "../FlexView/Center";
import Start from "../FlexView/Start";
import AutoText from "../AutoView/Text";
import LocalesText from "../Text";
import { locales } from "src/helpers/localesText";


interface PickModalProps {
    data: any[],
    onChange: (v: any) => void;
}


function PickModal(props: PickModalProps, ref: any) {

    const [open, setOpen] = useState(false)
    const { data, onChange } = props;

    useImperativeHandle(ref, () => {
        return {
            open: () => setOpen(true),
            close: () => setOpen(false),
        }

    }, [])

    function close() {
        setOpen(false)
    }

    function change(item: any) {
        onChange(item)
        close()
    }


    return (
        <Modal visible={open} transparent style={{ position: 'relative' }} onRequestClose={close}>
        

            <Center style={{ position: 'relative', zIndex: 100, flexDirection: 'column', flex: 1 }}>
            <TouchableOpacity activeOpacity={1} onPress={()=>{
                setOpen(false)
            }} style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', zIndex: 88, backgroundColor: 'rgba(0,0,0,0.4)' }} />
                {
                    data.map((item: any, index: number) => {
                        return (
                            <Start key={index} onPress={() => change(item)} style={{ 
                                paddingHorizontal: 32, paddingVertical: 32,backgroundColor:'#fff',width:'50%',borderBottomWidth:1,borderColor:'#ddd',zIndex:99 }}>
                                <LocalesText languageKey={locales[item] || item} />
                            </Start>
                        )
                    })
                }
            </Center>

        </Modal>
    )
}

export default forwardRef(PickModal)
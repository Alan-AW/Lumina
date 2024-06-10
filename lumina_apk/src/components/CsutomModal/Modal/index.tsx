import { Children, forwardRef, useEffect, useState,useImperativeHandle } from "react";
import { Modal, TouchableOpacity } from "react-native"
import Center from "src/components/FlexView/Center";


interface CustomModalProps{
    onClose?:Function,
    children:any
}

export default forwardRef((props:CustomModalProps,ref:any)=>{
    const {onClose,children} = props;
    const [show,setShow]=useState(false)

    useImperativeHandle(ref,()=>{
        return {
            openModal,
            closeModal,
        }
    },[])

    useEffect(()=>{
        setTimeout(()=>{
            setShow(true)
        },250)
    },[])

    function openModal(){
        setShow(true)

    }

    function closeModal(){
        setShow(false)
        setTimeout(()=>{
        onClose?.()
        },1000)
    }

    return (
        <Modal visible={show} transparent statusBarTranslucent onRequestClose={closeModal}
        >
            <TouchableOpacity onPress={closeModal} style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',zIndex:45,backgroundColor:'rgba(0,0,0,0.4)'}} />
            <Center style={{flex:1,position:'relative',zIndex:46}}>
                {children}
            </Center>
        </Modal>
    )
})
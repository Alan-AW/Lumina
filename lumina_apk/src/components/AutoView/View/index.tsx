import * as React from 'react';
import { TouchableOpacity, View,ViewProps,ViewStyle } from 'react-native';
import { useInlineStyle } from 'src/helpers/style';


type AutoViewProps={
    isCenter?:boolean,
    isRow?:boolean,
    onPress?:()=>void
}


const AutoView=(props:ViewProps & AutoViewProps)=>{
    let styles:ViewStyle | any={
        position: 'relative',
        zIndex:9,
    }
    const newStyle:any=props.style || {}
    if(props.isCenter){
        styles.alignItems='center'
        styles.justifyContent='center'
    }
    if(props.isRow){
        styles.flexDirection='row'
        styles.alignItems='center'
        styles.justifyContent='flex-start'
    }
    if(props.onPress){
        return (
            <TouchableOpacity {...props} style={useInlineStyle({...styles,...newStyle})}>{props.children}</TouchableOpacity>
        )
    }
    return (
        <View {...props} style={useInlineStyle({...styles,...newStyle})}>{props.children}</View>
    )
}

export default AutoView

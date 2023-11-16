import * as React from 'react';
import { View,ViewStyle } from 'react-native';
import { createStyles } from 'src/helpers/style';


const FlexSpace=(props:{style:ViewStyle,children:any})=>{
    return (
        <View style={[styles.flexSpaceBetween,props.style]}>{props.children}</View>
    )
}
const FlexCenter=(props:{style:ViewStyle,children:any})=>{
    return (
        <View style={[styles.flexSpaceBetween,props.style]}>{props.children}</View>
    )
}

const styles=createStyles({
    flexSpaceBetween:{
        display:'flex',
        justifyContent:"space-between",
        alignItems:'center',
        flexDirection:'row',
    },
    flexCenter:{
        display:'flex',
        justifyContent:"center",
        alignItems:'center',
        flexDirection:'row', 
        backgroundColor:'#000'
    }
})

export {
    FlexSpace,
    FlexCenter,
}
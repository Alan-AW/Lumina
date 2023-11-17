import { View,ViewProps } from 'react-native';
import React, { useEffect } from 'react';



const Container=(props:ViewProps)=>{
    return (
        <View {...props} style={[props.style,{backgroundColor:'#fffcf7'}]}>
            {props.children}
        </View>
    )
}

export default Container
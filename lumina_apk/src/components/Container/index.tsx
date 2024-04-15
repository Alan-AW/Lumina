import { View,ViewProps } from 'react-native';
import React, { useEffect } from 'react';



const Container=(props:ViewProps)=>{
    return (
        <View {...props} style={[{backgroundColor:'#fffcf7'},props.style]}>
            {props.children}
        </View>
    )
}

export default Container
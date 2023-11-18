import { View, ViewProps,ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useInlineStyle } from 'src/helpers/style';
import colors from 'src/constants/colors';



const ViewContainer = (props: ViewProps) => {
    return (
        <ScrollView {...props} style={[props.style, useInlineStyle({
            backgroundColor: '#fff',
            flex: 1,
            padding:18,
            marginRight:32,
            borderRadius:10,
            borderWidth:1,
            marginLeft:32,
            borderColor:colors.borderColor,
        })]}>
            {props.children}
        </ScrollView>
    )
}

export default ViewContainer
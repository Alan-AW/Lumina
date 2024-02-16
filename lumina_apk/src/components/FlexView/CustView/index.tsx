import * as React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { createStyles, useInlineStyle } from 'src/helpers/style';


interface FlexProps {
    left?: number;
    top?: number;
    bottom?: number;
    right?: number;
    vertical?: number;
    horizontal?: number;
    style?: ViewStyle;
    radius?: number;
    bgColor?: string;
    padding?: number | Array<number>;
    onPress?:()=>void;
    children?:any;
}

const CustView = (props: FlexProps) => {
    const { left, top, right, radius, bgColor, vertical, horizontal, bottom, padding } = props;
    let styles: ViewStyle = {
        borderRadius: radius || 0,
        marginTop: vertical || top,
        marginBottom: vertical || bottom,
        marginLeft: horizontal || left,
        marginRight: horizontal || right,
        backgroundColor: bgColor,
        position:'relative'
    };
    if (padding && typeof padding === 'number') {
        styles.padding = padding
    }
    if (padding && Array.isArray(padding)) {
        padding.forEach(item => {
            styles.paddingTop = styles.paddingTop || item;
            styles.paddingRight = styles.paddingRight || item;
            styles.paddingBottom = styles.paddingBottom || item;
            styles.paddingLeft = styles.paddingLeft || item;
        })

    }
    const newStyle: any = props.style || {};
    if(props.onPress){
        return (
            <TouchableOpacity {...props} style={useInlineStyle({...styles,...newStyle})}>{props.children}</TouchableOpacity>
        )
    }
    return (
        <View  style={useInlineStyle({...styles,...newStyle})}>{props.children}</View>
    )
}

export default CustView;
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
    width?:any;
    disabled?:boolean;
}

const SpaceBetween = (props: FlexProps) => {
    const { left, top, right, radius, bgColor, vertical, horizontal, bottom, padding,width,disabled } = props;
    let styles: ViewStyle = {
        borderRadius: radius || 0,
        justifyContent: 'space-between',
        flexDirection:'row',
        alignItems:'center',
        marginTop: vertical || top,
        marginBottom: vertical || bottom,
        marginLeft: horizontal || left,
        marginRight: horizontal || right,
        backgroundColor: bgColor,
        position:'relative'
    };
    if(width){
        styles.width=width;
    }
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
            <TouchableOpacity {...props} disabled={disabled} style={useInlineStyle({...styles,...newStyle})}>{props.children}</TouchableOpacity>
        )
    }
    return (
        <View  style={useInlineStyle({...styles,...newStyle})}>{props.children}</View>
    )
}

export default SpaceBetween;
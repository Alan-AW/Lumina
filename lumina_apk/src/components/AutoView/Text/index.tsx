import * as React from 'react';
import {Text, TextProps, TextStyle} from 'react-native';
import {fontName} from 'src/constants/font';
import {useInlineStyle} from 'src/helpers/style';

type AutoTextProps = {
  size?: number;
  type?: 'bold' | 'light' | 'medium' | 'regular';
};

const AutoText = (props: TextProps & AutoTextProps) => {
  let styles: TextStyle | any = {
    fontSize: 35,
    fontFamily: fontName.medium,
    // lineHeight:40,
    
  };
  const newStyle: any = props.style || {};
  if (props.size) {
    styles.fontSize = props.size+5;
    // styles.lineHeight = styles.fontSize+2;
  }
  if (props.type) {
    styles.fontFamily = fontName[props.type];
  }
  return (
    <Text {...props} allowFontScaling={false} style={useInlineStyle({...styles, ...newStyle})}>
      {props.children}
    </Text>
  );
};

export default AutoText;

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
    fontSize: 24,
    fontFamily: fontName.medium,
  };
  const newStyle: any = props.style || {};
  if (props.size) {
    styles.fontSize = props.size;
  }
  if (props.type) {
    styles.fontFamily = fontName[props.type];
  }
  return (
    <Text {...props} style={useInlineStyle({...styles, ...newStyle})}>
      {props.children}
    </Text>
  );
};

export default AutoText;

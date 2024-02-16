import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextProps, TextStyle } from 'react-native';
import { fontName } from 'src/constants/font';
import { useInlineStyle } from 'src/helpers/style';

type NormalTextProps = {
  size?: number;
  color?: string;
  isBold?: boolean;
  vertical?: number;
  horizontal?: number;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  children?:any;
};

const NormalText = (props: TextProps & NormalTextProps) => {
  const { vertical, left, top, isBold = false, color, size = 35,children, bottom, horizontal, right } = props;
  let styles: TextStyle = {
    fontSize: size,
    fontFamily: fontName.medium,
    paddingTop: vertical || top,
    paddingBottom: vertical || bottom,
    paddingLeft: horizontal || left,
    paddingRight: horizontal || right,
    fontWeight: isBold ? '600' : '500',
    color: color,
  };
  const newStyle: any = props.style || {};

  return (
    <Text {...props} allowFontScaling={false} style={useInlineStyle({ ...styles, ...newStyle })}>
      {children}
    </Text>
  );
};

export default NormalText;

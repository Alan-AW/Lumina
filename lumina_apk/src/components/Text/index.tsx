import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextProps, TextStyle } from 'react-native';
import { fontName } from 'src/constants/font';
import { useInlineStyle } from 'src/helpers/style';

type LocalesTextProps = {
  size?: number;
  color?: string;
  isBold?: boolean;
  vertical?: number;
  horizontal?: number;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  languageKey: string;
  leftText?: string;
  rightText?: string;
  children?:any;
};

const LocalesText = (props: TextProps & LocalesTextProps) => {
  const { t } = useTranslation();
  const { vertical, left, top, isBold = false, color, size = 30,children, bottom, horizontal, right, leftText, rightText, languageKey } = props;
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
      {leftText}
      {t(languageKey)}
      {rightText}
      {children}
    </Text>
  );
};

export default LocalesText;

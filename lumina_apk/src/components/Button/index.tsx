import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  Image,
  ImageProps,
  TextProps,
  TextStyle,
} from 'react-native';

const size = 5;

const hitSlop = {
  left: size,
  top: size,
  bottom: size,
  right: size,
};

type TestStyleProps={
  testStyle?:TextStyle
}

const TextButton = (props: TouchableOpacityProps & TextProps & TestStyleProps) => {
  return (
    <TouchableOpacity hitSlop={hitSlop} {...props}>
      <Text style={props.testStyle}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const IconButton = (props: TouchableOpacityProps) => {
  return (
    <TouchableOpacity hitSlop={hitSlop} {...props}>
      {props.children}
    </TouchableOpacity>
  );
};

export {TextButton, IconButton};

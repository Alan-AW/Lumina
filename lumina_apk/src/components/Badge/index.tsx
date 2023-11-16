import * as React from 'react';
import AutoView from '../AutoView/View';
import {ViewProps, View, ViewStyle} from 'react-native';
import {useInlineStyle} from 'src/helpers/style';
import AutoText from '../AutoView/Text';

type BadgeProps = {
  count: number;
};
const Badge = (props: BadgeProps & ViewProps) => {
  const defaultStyle = {
    paddingLeft: 6,
    paddingRight: 6,
    padding: 2,
    backgroundColor: '#fd8112',
    borderRadius:50,
  };
  const style: any = props.style || {};

  return (
    <View style={[useInlineStyle(style), useInlineStyle(defaultStyle)]}>
      <AutoText style={{color:'#fff'}}>{props.count}</AutoText>
    </View>
  );
};

export default Badge;

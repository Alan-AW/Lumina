import * as React from 'react';
import AutoView from '../AutoView/View';
import { ViewProps, View, ViewStyle } from 'react-native';
import { useInlineStyle } from 'src/helpers/style';
import AutoText from '../AutoView/Text';

type BadgeProps = {
  count: number;
};
const Badge = (props: BadgeProps & ViewProps) => {
  const defaultStyle = {
    backgroundColor: '#fd8112',
    borderRadius: 50,

  };
  const style: any = props.style || {};

  return (
    <View style={[useInlineStyle(style), useInlineStyle(defaultStyle),
    useInlineStyle({ justifyContent: 'center', display: 'flex', flexDirection: 'row', height: 35, minWidth: 35,alignItems:'center',paddingBottom:5, })]}>
      <AutoText style={{ color: '#fff',paddingTop:7, }} size={26}>{props.count}</AutoText>
    </View>
  );
};

export default Badge;

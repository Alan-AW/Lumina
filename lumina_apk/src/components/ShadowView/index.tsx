import {StyleSheet, Text, View} from 'react-native';
import {ShadowedView, shadowStyle} from 'react-native-fast-shadow';
import AutoView from '../AutoView/View';

export default (props: any) => {
  return (
    <View>
      <ShadowedView
        style={shadowStyle({
          opacity: 0.2,
          radius: 25,
          offset: [60, 60],
        })}>
            <AutoView style={{padding:12}}>
            {props.children}

            </AutoView>
      </ShadowedView>
    </View>
  );
};
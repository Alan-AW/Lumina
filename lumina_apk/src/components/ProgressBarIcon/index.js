import React from 'react';
import {View} from 'react-native';
import { useInlineStyle } from 'src/helpers/style';


const ProgressBarIcon = props => {
    return (
      <View
        style={useInlineStyle({
            width: '100%',
            height: 8,
            backgroundColor: '#e2e2e2',
            borderRadius: 50,
            position: 'relative',
          })}>
        <View
          style={useInlineStyle({
            width: `${props.value}%`,
            backgroundColor: '#559e18',
            height: '100%',
            position: 'absolute',
            left: 0,
            borderRadius: 50,
          })}
        />
      </View>
    );
  };

  export default ProgressBarIcon;
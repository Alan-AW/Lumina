import React from 'react';
import {View,ViewProps} from 'react-native';
import {adaptationConvert, createStyles} from 'src/helpers/style';


type RadioIconProps={
  size: number,
  color: string
}

const RadioIcon = (props:ViewProps & RadioIconProps) => {
  return (
    <View
      style={[
        styles.container,
        {
          width: adaptationConvert(props.size),
          height: adaptationConvert(props.size),
          backgroundColor:props.color,
        },
        props.style
      ]}
    />
  );
};

const styles = createStyles({
  container: {
    borderRadius: 50,
    marginLeft: 5,marginRight:5
  },
});

export default RadioIcon;

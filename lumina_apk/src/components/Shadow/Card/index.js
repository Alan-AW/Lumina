import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import {View, TouchableOpacity, StyleSheet, Platform, ViewProps, Alert, Text} from 'react-native';
import {createStyles} from 'src/helpers/style';



const Card = (props) => {
  const {children, elevation, opacity, cornerRadius} = props;


  const cardStyle = Platform.select({
    ios: () =>
      StyleSheet.create({
        container: {
          shadowRadius: elevation,
          shadowOpacity: opacity,
          shadowOffset: {width: 0, height: elevation},
          borderRadius: cornerRadius,
          backgroundColor: '#fff',
          // width: Dimensions.get('window').width - 40,
        },
      }),
    android: () =>
      StyleSheet.create({
        container: {
          elevation: 0,
          borderRadius: 10,
          backgroundColor: '#fff',
          // width: Dimensions.get('window').width - 40,
        },
      }),
  })();

  if(props.isBtn){
    return (
      <TouchableOpacity onPress={()=>props.onPress()} style={[cardStyle.container, styles.card, props.style]}>
         {props.children}
      </TouchableOpacity>
    )
  }

  return (
    <View style={[cardStyle.container, styles.card, props.style]}>
      {children}
    </View>
  );
};

Card.prototype = {
  backgroundColor: PropTypes.string,
  elevation: PropTypes.number,
  cornerRadius: PropTypes.number,
  opacity: PropTypes.number,
};

Card.defaultProps = {
  backgroundColor: '#ffffff',
  elevation: 3,
  cornerRadius: 5,
  opacity: 0.5,
};

const styles = createStyles({
  card: {
    margin: 0,
    elevation: 10,
    shadowRadius: 66,
    shadowOffset: {
      width: 32,
      height: 66,
    },
    shadowColor: '#999',
  },
});

export default Card;

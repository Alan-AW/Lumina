import PropTypes from 'prop-types';
import React from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewProps } from 'react-native';
import { createStyles, useInlineStyle } from 'src/helpers/style';
import Card from './Card'


type ShadowCardProps = {
  hiddenShadow?: boolean
  isBtn?: boolean
}

const ShadowCard = (props: ViewProps & ShadowCardProps & TouchableOpacityProps) => {
  const style: any = props.style || {}

  if (props.hiddenShadow) {
    return (
      <View style={style}>
        {props.children}
      </View>
    )
  }
  return (
    <Card style={style} onPress={props.onPress} isBtn={props.isBtn} disabled={!!props.disabled}>
    {props.children}
  </Card>

  );
};

ShadowCard.prototype = {
  backgroundColor: PropTypes.string,
  elevation: PropTypes.number,
  cornerRadius: PropTypes.number,
  opacity: PropTypes.number,
};

ShadowCard.defaultProps = {
  backgroundColor: '#f4f4f4',
  elevation: 3,
  cornerRadius: 5,
  opacity: 0.5,
};

const styles = createStyles({
  card: {
    margin: 0,
    elevation: 24,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowColor: '#f4f4f4',
  },
});

export default ShadowCard;

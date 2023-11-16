import PropTypes from 'prop-types';
import React from 'react';
import {View, Dimensions, StyleSheet, Platform, ViewProps} from 'react-native';
import {createStyles, useInlineStyle} from 'src/helpers/style';
import Card from './Card'



const ShadowCard = (props:ViewProps) => {
  const style:any=props.style || {}
  return (
    <Card style={style}>
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
  backgroundColor: '#ffffff',
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
    shadowColor: 'black',
  },
});

export default ShadowCard;

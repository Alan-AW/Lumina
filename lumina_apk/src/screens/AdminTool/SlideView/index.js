import Slider from '@react-native-community/slider';
import React from 'react';
import AutoText from 'src/components/AutoView/Text';
import AutoView from 'src/components/AutoView/View';

const SlideView = ({title,onChange}) => {
  return (
    <AutoView>
      <AutoText style={{paddingLeft: 30, color: '#2a2a2a',paddingTop:5}}>{title}</AutoText>
      <Slider
        maximumTrackTintColor="#ccc"
        minimumTrackTintColor="#559e18"
        maximumValue={100}
        minimumValue={0}
        style={{height:10}}
        thumbTintColor="#559e18"
        value={50}
      />
      <AutoView isRow style={{justifyContent: 'space-between'}}>
        <AutoText style={{paddingLeft: 30, color: '#666'}}>0%</AutoText>
        <AutoText style={{paddingRight: 30, color: '#666'}}>100%</AutoText>
      </AutoView>
    </AutoView>
  );
};

export default SlideView;

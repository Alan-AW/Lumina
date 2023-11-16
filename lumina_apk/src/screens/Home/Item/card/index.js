import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity,View,Text,Image } from 'react-native';
import AutoView from 'src/components/AutoView/View';
import RadioIcon from 'src/components/RadioIcon';
import colors from 'src/constants/colors';
import { fontName } from 'src/constants/font';
import { useInlineStyle } from 'src/helpers/style';

function GetPercent(num, total) {
    num = parseFloat(num);
    total = parseFloat(total);
    if (isNaN(num) || isNaN(total)) {
      return "-";
    }
    return total <= 0 ? 0 : (Math.round(num / total * 10000) / 100.00);
  }


const MyCustomProgressBar = props => {
    return (
      <AutoView
        style={{
          width: '100%',
          height: 4,
          backgroundColor: '#f4f4f4',
          borderRadius: 50,
          position: 'relative',
        }}>
        <AutoView
          style={{
            width: `${props.value}%`,
            backgroundColor: '#559e18',
            height: '100%',
            position: 'absolute',
            left: 0,
            borderRadius: 50,
          }}
        />
      </AutoView>
    );
  };


const Card = props => {
    const { title1, title2, name, cropItemCycle,serial_number,img,id } = props.item;
    const navigation = useNavigation();
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Bright',{id})}
        activeOpacity={1}
        style={useInlineStyle({
          marginRight: 15,
          position: 'relative',
          zIndex: 6,
          width: 160,
        })}>
        <AutoView isRow style={{ position: 'relative' }}>
          <RadioIcon
            color={colors.checked}
            size={10}
            style={{ position: 'absolute', left: -3 }}
          />
          <Text
            style={useInlineStyle({
              fontFamily: fontName.medium,
              fontSize: 14,
              color: '#000',
              paddingLeft: 20,
            })}>
            Aisle #{serial_number}
          </Text>
        </AutoView>
  
        <Text
          style={useInlineStyle({
            fontFamily: fontName.medium,
            fontSize: 14,
            color: '#000',
            paddingTop: 5,
          })}>
          Day{title2}
          <Text
            style={useInlineStyle({
              fontFamily: fontName.regular,
              fontSize: 12,
              color: '#000',
            })}>
            - {cropItemCycle} Day Cycle
          </Text>
        </Text>
        <View style={useInlineStyle({ marginTop: 10 })}>
          <MyCustomProgressBar value={GetPercent(title2,cropItemCycle)} />
        </View>
        <Text
          style={useInlineStyle({
            fontFamily: fontName.bold,
            fontSize: 16,
            color: '#000',
            paddingTop: 10,
            paddingBottom: 10,
          })}>
          {name}
        </Text>
        <View
          style={useInlineStyle({
            backgroundColor: '#f6f6f6',
            borderRadius: 10,
            justifyContent: 'center',
            flexDirection: 'row',
          })}>
          <Image
            style={useInlineStyle({ width: 120, height: 120 })}
            //require('../../asset/img/cai.png')
            source={{uri:img}}
          />
        </View>
      </TouchableOpacity>
    );
  };

  export default Card
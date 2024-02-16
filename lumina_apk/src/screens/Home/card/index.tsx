import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AutoView from 'src/components/AutoView/View';
import { IconButton } from 'src/components/Button';
import RadioIcon from 'src/components/RadioIcon';
import ShadowCard from 'src/components/Shadow';
import Badge from 'src/components/Badge';
import { getIndexList } from 'src/apis/home';

import colors from 'src/constants/colors';
import { fontName } from 'src/constants/font';
import { useNavigation } from '@react-navigation/native';
import {
  adaptationConvert,
  createStyles,
  useInlineStyle,
} from 'src/helpers/style';
import { IconBaogao, IconJinrujiantouxiao, IconShezhi } from 'src/iconfont';
import { useTranslation } from 'react-i18next';
import { GetPercent, getMonth } from 'src/helpers/utils';
import ScreenHeader from 'src/components/ScreenHeader';
import LocalesText from 'src/components/Text';
import { locales } from 'src/helpers/localesText';
import NormalText from 'src/components/Text/NormalText';
import CustView from 'src/components/FlexView/CustView';
import Center from 'src/components/FlexView/Center';
import Img from 'src/components/Image';
import MyCustomProgressBar from '../progressBar';

interface CardProps{
    onPress:()=>void;
    item:any
}
const HomeCard = (props:CardProps) => {
    const { title1, title2, name, cropItemCycle, serial_number, img, id } = props.item;
  
    return (
      <TouchableOpacity
        onPress={props.onPress}
        activeOpacity={1}
        style={useInlineStyle({
          marginRight: 32,
          position: 'relative',
          zIndex: 6,
        })}>
        <AutoView isRow style={{ position: 'relative' }}>
          <RadioIcon
            color={colors.checked}
            size={10}
            style={{ position: 'absolute', left: -3, top: 3 }}
          />
          <LocalesText languageKey={locales.Aisle} size={27} color='#000' top={7} left={15} rightText={` #${serial_number}`} />
        </AutoView>
        <LocalesText languageKey={locales.Day} rightText={title2} top={7} color='#000' size={23}>
          <LocalesText size={23} color='#000' leftText={`- ${cropItemCycle} `} languageKey={locales['Day Cycle']} />
        </LocalesText>
        <CustView top={10}>
          <MyCustomProgressBar value={GetPercent(title2, cropItemCycle)} />
        </CustView>
  
        <NormalText size={28} top={20} bottom={15} color='#000'>
          {name}
        </NormalText>
        <Center radius={10} vertical={15} horizontal={30} bgColor='#f6f6f6'>
          <Img url={img} size={240} radius={5} />
        </Center>
      </TouchableOpacity>
    );
  };

  export default HomeCard;
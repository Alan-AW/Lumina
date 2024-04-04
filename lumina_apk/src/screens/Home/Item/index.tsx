import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ShadowCard from 'src/components/Shadow';

import colors from 'src/constants/colors';
import {
  createStyles,
  useInlineStyle,
} from 'src/helpers/style';
import LocalesText from 'src/components/Text';
import { locales } from 'src/helpers/localesText';
import NormalText from 'src/components/Text/NormalText';
import CustView from 'src/components/FlexView/CustView';
import HomeCard from '../card';
import { IconButton } from 'src/components/Button';
import { IconTianjia } from 'src/iconfont';

interface RenderItemProps {
  item: any,
  navigation: any;

}

const RenderItem = (props: RenderItemProps) => {
  const { item, navigation } = props;

  if (item.data.length === 0) {
    return null;
  }
  return (
    <ShadowCard style={styles.scrollItem} hiddenShadow={true}>
      <View style={styles.scrollContainer}>
        <View style={useInlineStyle({ width: 350, marginRight: 100 })}>
          <LocalesText languageKey={locales.Room} rightText={` #${item.serial_number}`} size={28} color='#000' />
          <CustView
            style={{
              position: 'absolute',
              bottom: 0,
              justifyContent: 'flex-end',
            }}>
            <CustView
              style={{
                backgroundColor: '#cbfaff',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                padding: 32,
                paddingBottom: 20,
                paddingRight: 88,
              }}>

              <View>
                <NormalText color='#000' size={27} bottom={5}>
                  {item.max}
                </NormalText>
                <LocalesText languageKey={locales.MaxCurrentTemperature} color='#000' size={22} top={0} bottom={30} />


              </View>
              <CustView top={5}>
                <NormalText color='#000' size={27} bottom={5}>
                  {item.low}
                </NormalText>
                <LocalesText languageKey={locales.LowCurrentTemperature} color='#000' size={22} />

              </CustView>
            </CustView>
          </CustView>
        </View>
        <ScrollView horizontal style={{ minHeight: 118.25, paddingTop: 32 }} showsHorizontalScrollIndicator={true}>
          {item.data.map((item2: any, index: number) => {
            const cardItem = {
              id: item2.id,
              title1: item2.name1,
              title2: item2.date,
              name: item2.name2,
              img: item2.img,
              serial_number: item2.serial_number,
              cropItemCycle: item2.cropItemCycle
            }
            return (
              <HomeCard key={index} item={cardItem} onPress={() => {
                navigation.navigate('Update')
                // navigation.navigate('Bright', {
                //   id: item2.id, propsItem: item2, cardItem: {
                //     serial_number: item2.serial_number,
                //     currentDay: item2.date,
                //     max: item2.cropItemCycle
                //   }
                // })

              }} />

            );
          })}
        </ScrollView>
        {
          Array.isArray(item.data) && item.data.length > 0 && <IconButton onPress={() => {
            navigation.navigate('AddPage',
              { devicesId: item.data[0].id, roomCode: item.serial_number })

          }} >
            <IconTianjia size={24} color={colors.checked} />
          </IconButton>
        }

      </View>
    </ShadowCard>
  )
}

const styles = createStyles({
  scrollItem: {
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: colors.borderColor,
    borderWidth: 1,
    marginBottom: 15,
  },
  scrollContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  },
  scroll: {
    paddingLeft: 32,
    paddingRight: 32,
    marginTop: 15,
    width: '100%',
    flex: 1,
    position: 'relative',
  },
});

export default RenderItem;
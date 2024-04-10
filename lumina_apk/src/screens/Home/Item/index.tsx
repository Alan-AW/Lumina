import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ShadowCard from 'src/components/Shadow';

import colors from 'src/constants/colors';
import {
  adaptationConvert,
  createStyles,
  useInlineStyle,
} from 'src/helpers/style';
import LocalesText from 'src/components/Text';
import { locales } from 'src/helpers/localesText';
import NormalText from 'src/components/Text/NormalText';
import CustView from 'src/components/FlexView/CustView';
import HomeCard from '../card';
import { IconButton } from 'src/components/Button';
import { IconJinrujiantouxiao, IconTianjia } from 'src/iconfont';
import AutoText from 'src/components/AutoView/Text';
import Center from 'src/components/FlexView/Center';

interface RenderItemProps {
  item: any,
  navigation: any;

}

const RenderItem = (props: RenderItemProps) => {
  const { item, navigation } = props;

  // if (item.data.length === 0) {
  //   return null;
  // }

  function goJson() {
    navigation.navigate('Update',
      { device_id: 'test' })
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
        <ScrollView horizontal style={{ minHeight: 118.25, paddingTop: 32, flex: 1, marginRight: 100 }} showsHorizontalScrollIndicator={true}>
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
                // navigation.navigate('Update')
                navigation.navigate('Bright', {
                  id: item2.id, propsItem: item2, cardItem: {
                    serial_number: item2.serial_number,
                    currentDay: item2.date,
                    max: item2.cropItemCycle
                  }
                })

              }} />

            );
          })}
        </ScrollView>
        <Center style={{ height: '80%', zIndex: 9999, position: 'absolute', right: 0, bottom: 0, width: 100 }} onPress={goJson}>
          <IconButton>
            <IconJinrujiantouxiao size={adaptationConvert(35)} />
          </IconButton>
        </Center>
        {/* {
          Array.isArray(item.data) && <IconButton onPress={() => {
            if (item.data.length > 0 && item.data[0].device_id) {
              navigation.navigate('Update',
                { device_id: item.data[0].device_id })
            }


          }} >
            <AutoText>设置json</AutoText>
          </IconButton>
        } */}
        {
          Array.isArray(item.data) && <IconButton disabled={ item.data.length===0} onPress={() => {
            if (item.data.length > 0 && item.data[0].device_id) {
              navigation.navigate('AddPage',
                { devicesId: item.data[0].id, roomCode: item.serial_number })
            }


          }} >
            {
              item.data.length===0 ?<LocalesText languageKey={locales.nullDevices} />: <IconTianjia size={24} color={colors.checked} />
            }
           
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
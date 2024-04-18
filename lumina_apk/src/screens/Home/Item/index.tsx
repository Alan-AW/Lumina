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
import AutoView from 'src/components/AutoView/View';

interface RenderItemProps {
  item: any,
  navigation: any;

}

const RenderItem = (props: RenderItemProps) => {
  const { item, navigation } = props;

  // if (item.data.length === 0) {
  //   return null;
  // }



  const isShowAdd = !!item.device_id;

  const device_id = isShowAdd ? item.device_id : '';


  return (
    <AutoView style={{ paddingHorizontal:32,paddingVertical:16 }}>
      <ShadowCard style={styles.scrollItem} hiddenShadow={false}>
        <View style={styles.scrollContainer}>
          <View style={useInlineStyle({ width: 350, marginRight: 100 })}>
            <LocalesText languageKey={locales.Room} rightText={` ${item.serial_number}`} size={29} color='#000' style={{ fontWeight: '500' }} />
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
          <ScrollView horizontal style={{ minHeight: 150.25, paddingTop: 32, flex: 1, marginRight: 100 }} showsHorizontalScrollIndicator={true}>
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
                    roomName: item.serial_number,
                    devicesName: cardItem.serial_number,
                    cropNams: item.cropNams,
                    device_id: device_id
                  })
                }} />

              );
            })}
          </ScrollView>
          {/* {
          isShowAdd && <Center style={{ height: '80%', zIndex: 9999, position: 'absolute', right: 0, bottom: 0, width: 100 }} >
          <IconButton onPress={goJson} style={{ height: '100%', width: '100%',alignItems:'center',justifyContent:'center' }}>
            <IconJinrujiantouxiao size={adaptationConvert(35)} />
          </IconButton>
        </Center>
        } */}

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
            Array.isArray(item.data) && <IconButton disabled={!isShowAdd} onPress={() => {
              if (device_id) {
                navigation.navigate('AddPage',
                  { devicesId: item.addId, roomCode: item.serial_number })
              }


            }} >
              {
                !isShowAdd ? <LocalesText languageKey={locales.nullDevices} style={{ paddingRight: 16, fontSize: 28 }} /> : <IconTianjia size={24} color={colors.checked} />
              }

            </IconButton>
          }

        </View>
      </ShadowCard>
    </AutoView>
  )
}

const styles = createStyles({
  scrollItem: {
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 20,
    // borderColor: colors.borderColor,
    // borderWidth: 1,
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
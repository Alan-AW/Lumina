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
import { FONT_SIZE } from 'src/constants/style';
import Start from 'src/components/FlexView/Start';
import SpaceBetween from 'src/components/FlexView/SpaceBetween';
import End from 'src/components/FlexView/End';

interface RenderItemProps {
  item: any,
  navigation: any;

}

const RenderItem = (props: RenderItemProps) => {
  const { item, navigation } = props;

  function toAddPage(id: string, roomName: string) {
    navigation.navigate('AddPage',
      { devicesId: id, roomCode: roomName })
  }

  function toBright(devicesInfo: any) {

    navigation.navigate('Bright', {
      roomName: item.roomData.roomName,
      devicesName: devicesInfo.serial_number,
      cropNams: devicesInfo.cropItemName,
      device_id: devicesInfo.device_id,
      id: devicesInfo.id,
    })
  }


  return (
    <AutoView style={{ paddingHorizontal: 32, paddingVertical: 0 }}>
      <ShadowCard style={styles.scrollItem} hiddenShadow={false} >

        <SpaceBetween style={{ height: 540.25, alignItems: 'flex-start' }}>
          <End style={{ flexDirection: 'column', height: '100%', paddingBottom: 20, position: 'relative' }}>
            <Start style={{ position: 'absolute', left: 0, top: 0, width: "100%", height: 80 }}>
              <AutoText style={{ fontSize: 29, color: '#000', fontWeight: '700' }}>{item.roomData.roomName}</AutoText>
            </Start>
            <CustView
              style={{
                backgroundColor: '#cbfaff',
                borderRadius: 10,
                padding: 32,
                paddingBottom: 20,
                paddingRight: 88,
                height: '80%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <NormalText color='#000' size={27} bottom={5}>
                  {item.roomData.max}
                </NormalText>
                <LocalesText languageKey={locales.MaxCurrentTemperature} color='#000' size={22} top={0} bottom={30} />
              </View>
              <CustView top={5}>
                <NormalText color='#000' size={27} bottom={5}>
                  {item.roomData.min}
                </NormalText>
                <LocalesText languageKey={locales.LowCurrentTemperature} color='#000' size={22} />
              </CustView>
            </CustView>
          </End>

          <ScrollView style={useInlineStyle({ flex: 1, marginLeft: 16, paddingTop: 16 })} showsVerticalScrollIndicator={true}>
            {item.device_list.map((_item: any, index: number) => {
              const isDisabled = !!_item.device_id;
              const isShowBorder = index === item.device_list.length - 1;
              return (
                <AutoView key={index} style={{ minHeight: 440.25, flex: 1, position: 'relative', marginBottom: 32, padding: 24, paddingTop: 0, borderBottomWidth: isShowBorder ? 0 : 1, borderColor: '#f8f8f8' }}>
                  <Start>
                    <AutoText>
                      <LocalesText languageKey={locales.deviceName} rightText={':'} style={{ fontWeight: '700' }} />
                    </AutoText>
                    <AutoText style={{ marginLeft: 32, color: colors.checked, fontSize: FONT_SIZE.subTitle }}>{_item.serial_number}</AutoText>
                    <IconButton disabled={!isDisabled} onPress={() => toAddPage(_item.id, item.serial_number)} style={useInlineStyle({ position: 'absolute', right: 0, top: 0 })}>
                      {
                        isDisabled ? <IconTianjia size={FONT_SIZE.button} color={colors.checked} /> :
                          <LocalesText languageKey={locales.nullDevices} style={{ paddingRight: 16, fontSize: 28 }} />
                      }
                    </IconButton>
                  </Start>
                  <Start style={{ paddingTop: 12 }}>
                    {
                      _item.cropItemName && <HomeCard key={index} item={_item} onPress={() => toBright(_item)} />
                    }


                  </Start>
                </AutoView>

              );
            })}
          </ScrollView>
        </SpaceBetween>
      </ShadowCard>
    </AutoView >
  )
}

const styles = createStyles({
  scrollItem: {
    padding: 32,
    backgroundColor: '#fff',
    borderRadius: 10,
    // borderColor: colors.borderColor,
    // borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 48,
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
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Image,
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
import { IconJinrujiantouxiao, IconKongshuju, IconTianjia } from 'src/iconfont';
import AutoText from 'src/components/AutoView/Text';
import Center from 'src/components/FlexView/Center';
import AutoView from 'src/components/AutoView/View';
import { FONT_SIZE } from 'src/constants/style';
import Start from 'src/components/FlexView/Start';
import SpaceBetween from 'src/components/FlexView/SpaceBetween';
import End from 'src/components/FlexView/End';
import { setPlantEnd } from 'src/apis/home';
import { useTranslation } from 'react-i18next';
import ModalSelect from 'src/components/ModalSelect';

interface RenderItemProps {
  item: any,
  navigation: any;
  refresh: () => void;

}
const ADD_CYCLE = 1;
const CANCEL_CYCLE = 2


const RenderItem = (props: RenderItemProps) => {
  const { item, navigation, refresh } = props;
  const { t } = useTranslation();
  const selectRef = useRef<any>(null)
  const currentEditItem = useRef<any>(null)
  const [modalData, setModalData] = useState<any[]>([
    { name: t('StartNewPlantingCycle'), value: ADD_CYCLE }, { name: t('EndCurrentPlantingCycle'), value: CANCEL_CYCLE }
  ])


  function toAddPage(devicesInfo: any) {
    navigation.navigate('AddPage',
      {
        devicesId: devicesInfo.id, roomName: item.roomData.roomName,
        devicesName: devicesInfo.serial_number,
        cropNams: devicesInfo.cropItemName,
      })
  }

  function toBright(devicesInfo: any) {

    navigation.navigate('Bright', {
      roomName: item.roomData.roomName,
      devicesName: devicesInfo.serial_number,
      cropNams: devicesInfo.cropItemName,
      device_id: devicesInfo.device_id,
      disabled: !devicesInfo.cropItemName,
      id: devicesInfo.id,
    })
  }
  //长按结束当前种植周期
  function onLogPress(id: any) {
    setPlantEnd(id).then(res => {
      if (res.status) {
        refresh()
      } else {
        ToastAndroid.show(t(locales.requestError), ToastAndroid.SHORT)
      }

    }).catch(err => { })
  }

  function change(item: any) {
   

  if (item.value === ADD_CYCLE && currentEditItem.current) {
    Alert.alert(t('StartNewPlantingCycle')+'?', '', [
      {
        text: t('cancel'),
        onPress: () => { },
      },
      {
        text: t('confirm'),
        onPress: () => {
          toAddPage(currentEditItem.current);

        },
      },
    ])

    return;
  }
  if (item.value === CANCEL_CYCLE && currentEditItem.current.id) {
    Alert.alert(t('EndCurrentPlantingCycle')+'?', '', [
      {
        text: t('cancel'),
        onPress: () => { },
      },
      {
        text: t('confirm'),
        onPress: () => {
          setPlantEnd(currentEditItem.current.id).then(res => {
            if (res.status) {
              refresh()
            } else {
              ToastAndroid.show(t(locales.requestError), ToastAndroid.SHORT)
            }
      
          }).catch(err => { })
        },
      },
    ])
 
  }


}

//添加或结束种植周期
function addOrEnd(item: any) {
  currentEditItem.current = item;
  if (!item.cropItemName) {
    setModalData(modalData.filter(item => item.value !== CANCEL_CYCLE))
  }
  selectRef.current?.openModal()
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
                  <IconButton disabled={!isDisabled} onPress={() => addOrEnd(_item)} style={useInlineStyle({ position: 'absolute', right: 0, top: 0, backgroundColor: '#94d37d', borderRadius: 4 })}>
                    {
                      isDisabled ? <LocalesText languageKey={locales.ManagePlantingCycles}
                        style={{ fontSize: 28, borderColor: '#94d37d', borderRadius: 4, borderWidth: 1, paddingVertical: 8, paddingHorizontal: 16, color: '#fff' }} /> :
                        <LocalesText languageKey={locales.nullDevices} style={{ paddingRight: 4, fontSize: 28, color: '#fff' }} />
                    }
                  </IconButton>
                </Start>
                <Start style={{ paddingTop: 12, marginTop: 32 }} onPress={() => toBright(_item)} onLongPress={() => {
                  Alert.alert(`${t('endPlantCycle')}?`, "", [
                    { text: t('cancel'), onPress: () => { } },
                    { text: t('confirm'), onPress: () => onLogPress(_item.id) },
                  ])
                }}>
                  <HomeCard key={index} item={_item} onPress={() => toBright(_item)} />
                  {
                    // _item.cropItemName ? <HomeCard key={index} item={_item} onPress={() => toBright(_item)} /> :
                    //   <Center style={{ flex: 1,paddingLeft:32,backgroundColor:'#f4f4f4',height:350 }}>
                    //     <AutoView>
                    //       <Image source={require('src/asset/img/no-active-cycle-home-icon.png')} style={{width:adaptationConvert(null_plant_size),height:adaptationConvert(null_plant_size)}} />
                    //       {/* <IconKongshuju size={adaptationConvert(100)} color={'#8a8a8a'} />
                    //       <LocalesText languageKey={locales.nullData} top={10} /> */}
                    //     </AutoView>
                    //   </Center>
                  }


                </Start>
              </AutoView>

            );
          })}
        </ScrollView>
      </SpaceBetween>
    </ShadowCard>

    <ModalSelect ref={selectRef} data={modalData} change={change} />
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
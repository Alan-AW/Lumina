import react from 'react';
import { View, Text, FlatList } from 'react-native';
import ScreenHeader from 'src/components/ScreenHeader';
import { useTranslation } from 'react-i18next';
import AutoView from 'src/components/AutoView/View';
import Video from 'react-native-video';
import React from 'react';
import { useFetchData } from 'src/hooks/useFetchData';
import { getLiveData } from 'src/apis/home';
import Loading from 'src/components/Loading';
import SpaceBetween from 'src/components/FlexView/SpaceBetween';
import AutoText from 'src/components/AutoView/Text';
import { showLive } from 'src/components/CsutomModal';
import ShadowCard from 'src/components/Shadow';
import { IconEye, IconEyeNone, IconJinrujiantouxiao } from 'src/iconfont';
import colors from 'src/constants/colors';
import { adaptationConvert } from 'src/helpers/style';
import Start from 'src/components/FlexView/Start';

const Items = (props: any) => {
  const { item } = props;
  const { t } = useTranslation();
  const handleClick = () => {
    showLive(item.camera_link)
  }
  const isLink = !!item.camera_link;
  const iconSize = 50;

  return (
    <ShadowCard>
      <SpaceBetween onPress={handleClick} disabled={!item.camera_link}
        style={{ paddingVertical: 48, paddingHorizontal: 48, backgroundColor: '#fff' }}>
        <AutoView>
          <Start>
            <AutoText size={35}>{t('devicesName')}:</AutoText>
            <AutoText size={38} style={{ paddingLeft: 20,fontWeight:'600' }}>{item.serial_number}</AutoText>

          </Start>
          <Start style={{ paddingTop: 12 }}>
            <AutoText size={35}>{t('devicesStatus')}:</AutoText>
            <AutoText size={38} style={{ paddingLeft: 20, color: isLink ? colors.checked : colors.status_red }}>{isLink ? t('LiveStreaming') : t('notLive')}</AutoText>
          </Start>
        </AutoView>
        <View>
          {
            isLink ? <IconEye size={adaptationConvert(iconSize)} color={colors.checked} /> : <IconEyeNone size={adaptationConvert(iconSize)} color={colors.status_red} />
          }
        </View>
      </SpaceBetween>

    </ShadowCard>

  )

}



export default () => {
  const { dataList, loading } = useFetchData(getLiveData, {});
  const { t } = useTranslation();


  return (
    <AutoView style={{ flex: 1, paddingHorizontal: 32, paddingVertical: 24 }}>
      <ScreenHeader title={t('liveDevices')} subtitle='' hiddenBack />
      <Loading loading={loading}>
        <FlatList
          style={{ flex: 1 }}
          data={dataList || []}
          renderItem={({ item }) => {
            console.log(item, 666);

            return <Items item={item} />
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </Loading>
    </AutoView>
  )

}

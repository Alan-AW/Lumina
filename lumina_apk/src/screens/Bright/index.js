import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { IconButton } from 'src/components/Button';
import RadioIcon from 'src/components/RadioIcon';
import colors from 'src/constants/colors';
import { fontName } from 'src/constants/font';
import {
  adaptationConvert,
  createStyles,
  useInlineStyle,
} from 'src/helpers/style';
import {
  IconJiantouCopy,
  IconJinrujiantouxiao,
  IconShezhi,
  IconXiangji,
  IconZhexiantu,
} from 'src/iconfont';
import AutoView from 'src/components/AutoView/View';
import AutoText from 'src/components/AutoView/Text';
import ProgressBarIcon from 'src/components/ProgressBarIcon';
import ShadowCard from 'src/components/Shadow';
import Chart1 from '../Plan/Chart1';
import BrightCard from './BrightCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getLiveList } from 'src/apis/home';
import { useTranslation } from 'react-i18next';
import { getMonth } from 'src/helpers/utils';
import ScreenHeader from 'src/components/ScreenHeader';
import Start from 'src/components/FlexView/Start';
import Back from 'src/components/ScreenHeader/Back';
import { FONT_SIZE } from 'src/constants/style';
import SpaceBetween from 'src/components/FlexView/SpaceBetween';
import EchartsCotainer from 'src/components/EchartsCotainer';
import Center from 'src/components/FlexView/Center';
import LocalesText from 'src/components/Text';
import { getLineOptaion, lineOption } from 'src/components/EchartsCotainer/option';
import { WIDTH } from 'src/constants/global';
import { locales } from 'src/helpers/localesText';

function GetPercent(num, total) {
  num = parseFloat(num);
  total = parseFloat(total);
  if (isNaN(num) || isNaN(total)) {
    return '-';
  }
  return total <= 0 ? 0 : Math.round((num / total) * 10000) / 100.0;
}

const lineSize = 1.2;
const echatsHeight=adaptationConvert(505);

const Bright = () => {
  const routes = useRoute();

  const { t } = useTranslation();
  const navigation = useNavigation();
 
  const [liveData, setLiveData] = useState([]);
  const [echartsData, setEchartsData] = useState(false);
  const [tempData, setTempData] = useState([]);
  const [echartsObj, setEchartsObj] = useState(null)
  const { device_id, roomName, devicesName, cropNams } = routes.params;



  useEffect(() => {
    if (routes && routes.params.id) {
      getLiveList(routes.params.id).then(res => {
        const { vpd, temperature_humidity, lighting, fertigation } = res.data;
        setEchartsObj({
          vpd,
          temperature_humidity,
          lighting,
          fertigation,
        })
        console.log(res.data);
      })
    }
  }, [routes.params]);

  function goSet() {
    navigation.navigate('AdminTools', {
      id: routes.params.id,
      ... routes.params
    });
  }

  const EchatsOption = useMemo(() => {
    const obj = {}
    if (echartsObj) {
      for (let key in echartsObj) {
        obj[key] = getLineOptaion(echartsObj[key])
      }
    }
    return obj;

  }, [echartsObj])



  return (
    <View style={styles.container}>
      <SpaceBetween>
        <Start>
          <Back noneText={true} />
          <AutoText style={{ fontWeight: '700', fontSize: FONT_SIZE.title, color: '#4a4a4a' }}>{`${roomName} | ${devicesName}`}</AutoText>
        </Start>
      </SpaceBetween>

      <SpaceBetween>
        <EchartsCotainer options={EchatsOption.vpd} echartWidth={adaptationConvert(WIDTH / lineSize)} echartHeight={echatsHeight}>
          <Start style={{ paddingVertical: 32, paddingHorizontal: 32 }}>
            <Center style={{ padding: 26, backgroundColor: colors.cardIconBgColor }}>
              <IconZhexiantu size={adaptationConvert(FONT_SIZE.icon)} />
            </Center>
            <LocalesText left={8} languageKey={locales.vpd} size={FONT_SIZE.subTitle} />
          </Start>
        </EchartsCotainer>
        <EchartsCotainer options={EchatsOption.temperature_humidity} echartWidth={adaptationConvert(WIDTH / lineSize)} echartHeight={echatsHeight}>
          <Start style={{ paddingVertical: 32, paddingHorizontal: 32 }}>
            <Center style={{ padding: 26, backgroundColor: colors.cardIconBgColor }}>
              <IconZhexiantu size={adaptationConvert(FONT_SIZE.icon)} />
            </Center>
            <LocalesText left={8} languageKey={locales.temperature_humidity} size={FONT_SIZE.subTitle} />
          </Start>
        </EchartsCotainer>
      </SpaceBetween>
      <SpaceBetween>
        <EchartsCotainer options={EchatsOption.lighting} echartWidth={adaptationConvert(WIDTH / lineSize)} echartHeight={echatsHeight}>
          <Start style={{ paddingVertical: 32, paddingHorizontal: 32 }}>
            <Center style={{ padding: 26, backgroundColor: colors.cardIconBgColor }}>
              <IconZhexiantu size={adaptationConvert(FONT_SIZE.icon)} />
            </Center>
            <LocalesText left={8} languageKey={locales.lighting} size={FONT_SIZE.subTitle} />
          </Start>
        </EchartsCotainer>
        <EchartsCotainer options={EchatsOption.fertigation} echartWidth={adaptationConvert(WIDTH / lineSize)} echartHeight={echatsHeight}>
          <Start style={{ paddingVertical: 32, paddingHorizontal: 32 }}>
            <Center style={{ padding: 26, backgroundColor: colors.cardIconBgColor }}>
              <IconZhexiantu size={adaptationConvert(FONT_SIZE.icon)} />
            </Center>
            <LocalesText left={8} languageKey={locales.fertigation} size={FONT_SIZE.subTitle} />
          </Start>
        </EchartsCotainer>
      </SpaceBetween>





    
  

      <AutoView isRow style={{ marginTop: 22, alignItems: 'center', position: 'absolute', left: 64, bottom: 32 }}>
        <ShadowCard style={useInlineStyle({height:88,paddingHorizontal:32,alignItems:'center',justifyContent:'center'})}
        isBtn onPress={goSet}
        >
          <SpaceBetween>
            <IconButton onPress={goSet}>
            <IconShezhi size={adaptationConvert(38)} />
            </IconButton>
            <LocalesText languageKey={locales.ManualCommands} style={useInlineStyle({paddingLeft:15})} />
          </SpaceBetween>
        </ShadowCard>

        <ShadowCard
          isBtn
          onPress={() => navigation.navigate('Update', { device_id: device_id })}
          style={useInlineStyle({
            borderRadius: 10,
            height: 88,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 32,
          })}>
          <AutoView isRow >
            <IconButton style={{ paddingTop: 0 }}>
              <IconShezhi size={adaptationConvert(38)} />
            </IconButton>
            <AutoText style={{ paddingLeft: 15, color: '#000', alignItems: 'center', fontSize: FONT_SIZE.subTitle }}>
              {t("AdminTools")}
            </AutoText>
          </AutoView>
        </ShadowCard>
        <View style={{ flex: 1,marginRight:24 }}>
          <ShadowCard
            style={useInlineStyle({
              borderRadius: 10,
              marginLeft: 37,
              flex: 1,
              height: 88,
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
              paddingLeft: 32,
            })}>
            <AutoView isRow style={{ flex:1, height: 88 }}>
              <AutoView
                style={{
                  backgroundColor: '#cbfaff',
                  paddingVertical: 7,
                  paddingHorizontal: 14,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderRadius: 10,
                }}>
                <AutoText style={{ fontSize: FONT_SIZE.title, fontWeight: '600' }}>{t('Cultivars')}</AutoText>
              </AutoView>
              <AutoText style={{ paddingLeft: 15, fontSize: FONT_SIZE.subTitle, fontWeight: '600' }}>
                {cropNams}
              </AutoText>
            </AutoView>
          </ShadowCard>
        </View>

      </AutoView>
    </View>
  );
};

const styles = createStyles({
  container: {
    padding: 32,
    paddingTop: 0,
    flex: 1,
    position: 'relative',
    height: '100%',
  },
  backBtn: {
    backgroundColor: '#fff',
    width: 35,
    height: 30,
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  header: {
    justifyContent: 'space-between',
  },
  headerText1: {
    color: '#2a2a2a',
    fontFamily: 'pingfanghk-semibold',
    fontWeight: '500',
    fontSize: 14,
  },
  headerText2: {
    color: '#656363',
    paddingTop: 0,
    fontFamily: 'pingfanghk-light',
    fontWeight: '500',
    fontSize: 12,
  },
  headerText3: {
    color: '#000',
    fontFamily: fontName.regular,
    fontSize: 26,
    lineHeight: 30,
    alignItems: 'center'
  },
});

export default Bright;

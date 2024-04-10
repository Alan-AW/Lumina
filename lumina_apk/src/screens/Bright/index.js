import React, { useEffect, useState } from 'react';
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

function GetPercent(num, total) {
  num = parseFloat(num);
  total = parseFloat(total);
  if (isNaN(num) || isNaN(total)) {
    return '-';
  }
  return total <= 0 ? 0 : Math.round((num / total) * 10000) / 100.0;
}

const Bright = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const routes = useRoute();
  const childData = routes.params.propsItem;
  const cardData = routes.params.cardItem;
  const [liveData, setLiveData] = useState([]);
  const [echartsData, setEchartsData] = useState(false);
  const [tempData, setTempData] = useState([]);


  useEffect(() => {
    console.log(routes, 'routes');
    if (routes && routes.params.id) {
      getLiveList(routes.params.id).then(res => {
        setLiveData(res.data.temperature.flat());
        const data1 = [];
        const data2 = [];
        const data3 = [];
        res.data.echarts.value.forEach(element => {
          data1.push(element.high);
          data2.push(element.midd);
          data3.push(element.low);
        });
        const _data = [];
        for (let key in res.data.unit_status) {
          const item = res.data.unit_status[key];
          _data.push({
            name: key,
            ...item,
          });
        }
        setTempData(_data);
        setEchartsData({
          data1,
          data2,
          data3,
          label: res.data.echarts.x_label,
        });
      });
    }
  }, [routes.params]);
  return (
    <View style={styles.container}>
      <ScreenHeader title={t("Bright Renaissance")} otherNode={() => {
        return (
          <>
            <Text style={styles.headerText2}>
              <Text
                style={
                  styles.headerText3
                }>{`[${t("Room")} #${childData?.serial_number}]`}</Text>
            </Text>
           
          </>
        )
      }
      }
        right={
          () => {
            return (

              <AutoView style={{ width: 250 }}>
                <AutoView
                  isRow
                  style={{ paddingBottom: 10, justifyContent: 'flex-end' }}>
                  <AutoText size={20} style={{ color: '#000', fontWeight: '600' }} type="bold">
                    {t("Day")} {cardData.currentDay}
                  </AutoText>
                  <AutoText size={20} style={{ color: '#2a2a2a' }}>
                    - {cardData.max} {t('Day Cycle')}
                  </AutoText>
                </AutoView>

                <ProgressBarIcon
                  value={GetPercent(cardData.currentDay, cardData.max)}
                />
              </AutoView>
            )
          }
        } />

      <AutoView isRow style={{ marginTop: 32 }}>
        <ShadowCard
          style={useInlineStyle({
            width: 737,
            backgroundColor: '#fff',
            height: 630,
            borderRadius: 10,
            padding: 32,
            paddingTop: 24,
          })}>
          <AutoView
            isRow
            style={{ justifyContent: 'space-between', paddingRight: 15 }}>
            <AutoView isRow>
              <IconButton
                style={useInlineStyle({
                  backgroundColor: '#cbfaff',
                  width: 60,
                  height: 60,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                })}>
                <IconXiangji color="#157a86" size={adaptationConvert(38)} />
              </IconButton>
              <AutoText style={{ paddingLeft: 15, color: '#2a2a2a' }}>
                {t('LiveCamera')}
              </AutoText>
            </AutoView>
            <IconButton>
              <IconJinrujiantouxiao size={adaptationConvert(30)} />
            </IconButton>
          </AutoView>
          <AutoView
            isRow
            style={{
              height: '100%',
              flexWrap: 'wrap',
              marginTop: 20,
              paddingLeft: 0,
            }}>
            {liveData.map((item, index) => {
              const marginTop = index < 7 ? 0 : 7;
              let marginRight = 5;
              marginRight = index - (1 % 7) === 0 || index === 1 ? 0 : 7;
              if (index === 1) {
                marginRight = 5;
              }

              return (
                <AutoView
                  key={index}
                  isCenter
                  style={{
                    width: 77,
                    height: 50,
                    backgroundColor: '#86d88b',
                    marginTop,
                    marginRight,
                    borderRadius: 5,
                  }}>
                  <AutoText size={18}>{item}℃</AutoText>
                </AutoView>
              );
            })}
          </AutoView>
        </ShadowCard>
        <ShadowCard
          style={useInlineStyle({
            backgroundColor: '#fff',
            height: 630,
            flex: 1,
            marginLeft: 35,
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 32,
            position: 'relative',
          })}>
          <AutoView
            isRow
            style={{ justifyContent: 'space-between' }}
            onPress={() => navigation.navigate('Plan')}>
            <AutoView isRow>
              <IconButton
                style={useInlineStyle({
                  backgroundColor: '#cbfaff',
                  width: 60,
                  height: 60,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                })}>
                <IconZhexiantu color="#157a86" size={adaptationConvert(38)} />
              </IconButton>
              <AutoText style={{ paddingLeft: 15, color: '#2a2a2a' }}>
                {t('Analytics')} | {t('AveragePlantTemperature')} ({t('last')} 18 {t('Days')})
              </AutoText>
            </AutoView>
            <IconButton>
              <IconJinrujiantouxiao size={adaptationConvert(30)} />
            </IconButton>
          </AutoView>
          {echartsData && (
            <View
              style={useInlineStyle({
                position: 'absolute',
                left: -50,
                width: '117%',
                height: '110%',
                top: 0,
                zIndex: 1,
              })}>
              <Chart1 data={echartsData} width={350} />
            </View>
          )}

          <View
            style={useInlineStyle({
              position: 'absolute',
              left: 32,
              width: '100%',
              bottom: 20,
              zIndex: 1,
            })}>
            <AutoView isRow>
              <AutoView isRow>
                <RadioIcon size={10} color="#40848b" />
                <AutoText style={{ paddingLeft: 5 }}>{`≤21.0C`}</AutoText>
              </AutoView>
              <AutoView isRow style={{ marginLeft: 10, marginRight: 10 }}>
                <RadioIcon size={10} color="#79d87f" />
                <AutoText style={{ paddingLeft: 5 }}>{`≤21.0C`}</AutoText>
              </AutoView>
              <AutoView isRow>
                <RadioIcon size={10} color="#df6175" />
                <AutoText style={{ paddingLeft: 5 }}>{`≤21.0C`}</AutoText>
              </AutoView>
            </AutoView>
          </View>
        </ShadowCard>
      </AutoView>
      <AutoView isRow style={{ marginTop: 38, position: 'relative' }}>
        {tempData.map((item, index) => {
          return (
            <BrightCard key={index} item={item} index={index}></BrightCard>
          );
        })}
      </AutoView>
      <AutoView isRow style={{ marginTop: 22, alignItems: 'center', position: 'absolute', left: 32, bottom: 32 }}>
        {/* <ShadowCard
          isBtn
          onPress={() => navigation.navigate('AdminTools', { ...routes.params })}
          style={useInlineStyle({
            borderRadius: 10,
            width: 350,
            height: 88,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            paddingLeft: 15,
          })}>
          <AutoView isRow >
            <IconButton style={{ paddingTop: 0 }}>
              <IconShezhi size={adaptationConvert(38)} />
            </IconButton>
            <AutoText style={{ paddingLeft: 15, color: '#000', alignItems: 'center' }} >
              {t("AdminTools")}
            </AutoText>
          </AutoView>
        </ShadowCard> */}
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
          <AutoView isRow>
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
              <AutoText size={24}>{t('Cultivars')}</AutoText>
            </AutoView>
            <AutoText style={{ paddingLeft: 15, color: '#000' }}>
              {t('ButterheadLettuce')}, {t("Leaf")}/{t("BataviaLettuce")}
            </AutoText>
          </AutoView>
        </ShadowCard>
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

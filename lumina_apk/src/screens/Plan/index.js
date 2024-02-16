import React from 'react';
import { View, Text } from 'react-native';
import { IconButton } from 'src/components/Button';
import RadioIcon from 'src/components/RadioIcon';
import colors from 'src/constants/colors';
import { fontName } from 'src/constants/font';
import {
  adaptationConvert,
  createStyles,
  useInlineStyle,
} from 'src/helpers/style';
import { IconJiantouCopy, IconZhexiantu } from 'src/iconfont';
import Chart4 from './Chart4';
import AutoView from 'src/components/AutoView/View';
import AutoText from 'src/components/AutoView/Text';
import Chart2 from './Chart2';
import Chart3 from './Chart3';
import { useNavigation } from '@react-navigation/native';
import ShadowCard from 'src/components/Shadow';
import { getMonth } from 'src/helpers/utils';
import { useTranslation } from 'react-i18next';
import ScreenHeader from 'src/components/ScreenHeader';


const Plan = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <ScreenHeader title={t("Analytics")} otherNode={() => {
        return (
          <View
            style={[
              styles.flex,
              { alignItems: 'center', justifyContent: 'flex-start' },
            ]}>
            <View>
              <Text style={styles.headerText3}>{`[ ${t('Zone')} A ${t('Room')} #1`}</Text>
            </View>
          
          </View>
        )
      }} />

      <View style={[styles.flex, useInlineStyle({ flex: 1, marginTop: 32 })]}>
        <View
          style={useInlineStyle({ width: '59%', height: '100%' })}>
          <ShadowCard
            style={useInlineStyle({
              height: '48%',
              backgroundColor: '#fff',
              position: 'relative',
              padding: 32,
              borderRadius: 20,
            })}>
            <View
              style={useInlineStyle({
                position: 'absolute',
                left: -20,
                width: '110%',
                height: '110%',
                top: 20,
                zIndex: 1,
              })}>
              <Chart4 option={false} />
            </View>
            <View
              style={[
                styles.flex,
                { position: 'relative', zIndex: 9, alignItems: 'center' },
              ]}>
              <IconButton
                style={useInlineStyle({
                  width: 60,
                  height: 60,
                  backgroundColor: '#cbfaff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                })}>
                <IconZhexiantu size={adaptationConvert(22)} />
              </IconButton>
              <AutoText
                size={25}
                style={{

                  fontFamily: fontName.medium,
                  paddingLeft: 20,
                  color: '#2a2a2a',
                }}>
                {t('Analytics')} | {t('AveragePlantTemperature')} ({t('Last')} 18 {t('Days')})
              </AutoText>
            </View>
            <View
              style={useInlineStyle({
                position: 'absolute',
                left: 32,
                width: '100%',
                bottom: 28,
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
          <ShadowCard
            style={useInlineStyle({
              height: '48%',
              backgroundColor: '#fff',
              position: 'relative',
              padding: 32,
              borderRadius: 20,
              marginTop: '3%',
            })}>
            <View
              style={useInlineStyle({
                position: 'absolute',
                left: -30,
                width: '110%',
                height: '110%',
                top: 30,
                zIndex: 1,
              })}>
              <Chart2 option={false} />
            </View>
            <View
              style={[
                styles.flex,
                { position: 'relative', zIndex: 9, alignItems: 'center' },
              ]}>
              <IconButton
                style={useInlineStyle({
                  width: 60,
                  height: 60,
                  backgroundColor: '#cbfaff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                })}>
                <IconZhexiantu size={adaptationConvert(22)} />
              </IconButton>
              <AutoText
              size={25}
                style={{
                  fontFamily: fontName.medium,
                  paddingLeft: 10,
                  color: '#2a2a2a',
                }}>
                {t('Analytics')} | {t('AveragePlantTemperature')} ({t('Last')} 18 {t('Days')})
              </AutoText>
            </View>
            <View
              style={useInlineStyle({
                position: 'absolute',
                left: 32,
                width: '100%',
                bottom: 28,
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
        </View>
        <ShadowCard
          style={useInlineStyle({
            width: '38%',
            height: '98%',
            marginLeft: '2%',
            marginRight: '2.5%',
          })}>
          <View
            style={useInlineStyle({
              height: '101.5%',
              backgroundColor: '#fff',
              position: 'relative',
              padding: 32,
              borderRadius: 20,
            })}>
            <View
              style={useInlineStyle({
                position: 'absolute',
                left: 20,
                width: '105%',
                height: '105%',
                top: 15,
                zIndex: 1,
              })}>
              <Chart3 option={false} />
            </View>
            <View
              style={[
                styles.flex,
                { position: 'relative', zIndex: 9, alignItems: 'center' },
              ]}>
              <IconButton
                style={useInlineStyle({
                  width: 60,
                  height: 60,
                  backgroundColor: '#cbfaff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                })}>
                <IconZhexiantu size={adaptationConvert(22)} />
              </IconButton>
              <AutoText
                size={25}
                style={{
                  fontFamily: fontName.medium,
                  paddingLeft: 10,
                  color: '#2a2a2a',
                }}>
                {t('Analytics')} | {t('AveragePlantTemperature')} ({t('Last')} 18 {t('Days')})
              </AutoText>
            </View>
            <View
              style={useInlineStyle({
                position: 'absolute',
                left: 32,
                width: '100%',
                bottom: 28,
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
          </View>
        </ShadowCard>
      </View >
    </View >
  );
};

const styles = createStyles({
  container: {
    padding: 32,
    paddingTop: 0,
    flex: 1,
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
  header: {},
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
  }
});

export default Plan;

import React from 'react';
import {View, Text} from 'react-native';
import {IconButton} from 'src/components/Button';
import RadioIcon from 'src/components/RadioIcon';
import colors from 'src/constants/colors';
import {fontName} from 'src/constants/font';
import {
  adaptationConvert,
  createStyles,
  useInlineStyle,
} from 'src/helpers/style';
import {IconJiantouCopy, IconZhexiantu} from 'src/iconfont';
import Chart4 from './Chart4';
import AutoView from 'src/components/AutoView/View';
import AutoText from 'src/components/AutoView/Text';
import Chart2 from './Chart2';
import Chart3 from './Chart3';
import {useNavigation} from '@react-navigation/native';
import ShadowCard from 'src/components/Shadow';
import { getMonth } from 'src/helpers/utils';
import { useTranslation } from 'react-i18next';


const Plan = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={[styles.flex, styles.header]}>
        <ShadowCard style={styles.backBtn}>
          <IconButton onPress={() => navigation.goBack()}>
            <IconJiantouCopy size={adaptationConvert(16)} />
          </IconButton>
        </ShadowCard>
        <View style={useInlineStyle({paddingTop: 3})}>
          <Text style={styles.headerText1}>{t("Analytics")}</Text>
          <View
            style={[
              styles.flex,
              {alignItems: 'center', justifyContent: 'flex-start'},
            ]}>
            <View>
              <Text style={styles.headerText2}>
              {t(getMonth())} {new Date().getDate()},{new Date().getFullYear()}
                <Text style={styles.headerText3}>{`[ ${t('Zone')} A ${t('Room')} #1`}</Text>
              </Text>
            </View>
            <RadioIcon color={colors.checked} size={10} />
            <View>
              <Text style={styles.headerText3}>{`${t('Aisle')} #001]`}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.flex, {flex: 1}]}>
        <View
          style={useInlineStyle({width: '59%', height: '100%', marginTop: 15})}>
          <View
            style={useInlineStyle({
              height: 290,
              backgroundColor: '#fff',
              position: 'relative',
              padding: 20,
              borderColor: '#f4f4f4',
              borderWidth: 1,
              borderRadius: 20,
            })}>
            <View
              style={useInlineStyle({
                position: 'absolute',
                left: -10,
                width: '100%',
                height: 370,
                top: -30,
                zIndex: 1,
              })}>
              <Chart4 option={false} />
            </View>
            <View
              style={[
                styles.flex,
                {position: 'relative', zIndex: 9, alignItems: 'center'},
              ]}>
              <IconButton
                style={useInlineStyle({
                  width: 40,
                  height: 40,
                  backgroundColor: '#cbfaff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                })}>
                <IconZhexiantu size={adaptationConvert(12)} />
              </IconButton>
              <Text
                style={useInlineStyle({
                  fontSize: 14,
                  fontFamily: fontName.medium,
                  paddingLeft: 10,
                  color: '#2a2a2a',
                })}>
                {t('Analytics')} | {t('AveragePlantTemperature')} ({t('Last')} 18 {t('Days')})
              </Text>
            </View>
            <View
              style={useInlineStyle({
                position: 'absolute',
                left: 20,
                width: '100%',
                bottom: 12,
                zIndex: 1,
              })}>
              <AutoView isRow>
                <AutoView isRow>
                  <RadioIcon size={10} color="#40848b" />
                  <AutoText style={{paddingLeft: 5}}>{`≤21.0C`}</AutoText>
                </AutoView>
                <AutoView isRow style={{marginLeft: 10, marginRight: 10}}>
                  <RadioIcon size={10} color="#79d87f" />
                  <AutoText style={{paddingLeft: 5}}>{`≤21.0C`}</AutoText>
                </AutoView>
                <AutoView isRow>
                  <RadioIcon size={10} color="#df6175" />
                  <AutoText style={{paddingLeft: 5}}>{`≤21.0C`}</AutoText>
                </AutoView>
              </AutoView>
            </View>
          </View>
          <View
            style={useInlineStyle({
              height: 290,
              backgroundColor: '#fff',
              position: 'relative',
              padding: 20,
              borderColor: '#f4f4f4',
              borderWidth: 1,
              borderRadius: 20,
              marginTop: 20,
            })}>
            <View
              style={useInlineStyle({
                position: 'absolute',
                left: -10,
                width: '100%',
                height: 370,
                top: -30,
                zIndex: 1,
              })}>
              <Chart2 option={false} />
            </View>
            <View
              style={[
                styles.flex,
                {position: 'relative', zIndex: 9, alignItems: 'center'},
              ]}>
              <IconButton
                style={useInlineStyle({
                  width: 40,
                  height: 40,
                  backgroundColor: '#cbfaff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                })}>
                <IconZhexiantu size={adaptationConvert(12)} />
              </IconButton>
              <Text
                style={useInlineStyle({
                  fontSize: 14,
                  fontFamily: fontName.medium,
                  paddingLeft: 10,
                  color: '#2a2a2a',
                })}>
                {t('Analytics')} | {t('AveragePlantTemperature')} ({t('Last')} 18 {t('Days')})
              </Text>
            </View>
            <View
              style={useInlineStyle({
                position: 'absolute',
                left: 20,
                width: '100%',
                bottom: 12,
                zIndex: 1,
              })}>
              <AutoView isRow>
                <AutoView isRow>
                  <RadioIcon size={10} color="#40848b" />
                  <AutoText style={{paddingLeft: 5}}>{`≤21.0C`}</AutoText>
                </AutoView>
                <AutoView isRow style={{marginLeft: 10, marginRight: 10}}>
                  <RadioIcon size={10} color="#79d87f" />
                  <AutoText style={{paddingLeft: 5}}>{`≤21.0C`}</AutoText>
                </AutoView>
                <AutoView isRow>
                  <RadioIcon size={10} color="#df6175" />
                  <AutoText style={{paddingLeft: 5}}>{`≤21.0C`}</AutoText>
                </AutoView>
              </AutoView>
            </View>
          </View>
        </View>
        <View
          style={useInlineStyle({
            width: '38%',
            height: '100%',
            marginTop: 15,
            marginLeft: '2.5%',
            marginRight: '2.5%',
          })}>
          <View
            style={useInlineStyle({
              height: 600,
              backgroundColor: '#fff',
              position: 'relative',
              padding: 20,
              borderColor: '#f4f4f4',
              borderWidth: 1,
              borderRadius: 20,
            })}>
            <View
              style={useInlineStyle({
                position: 'absolute',
                left: 20,
                width: '100%',
                height: 670,
                top: -30,
                zIndex: 1,
              })}>
              <Chart3 option={false} />
            </View>
            <View
              style={[
                styles.flex,
                {position: 'relative', zIndex: 9, alignItems: 'center'},
              ]}>
              <IconButton
                style={useInlineStyle({
                  width: 40,
                  height: 40,
                  backgroundColor: '#cbfaff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                })}>
                <IconZhexiantu size={adaptationConvert(12)} />
              </IconButton>
              <Text
                style={useInlineStyle({
                  fontSize: 14,
                  fontFamily: fontName.medium,
                  paddingLeft: 10,
                  color: '#2a2a2a',
                })}>
              {t('Analytics')} | {t('AveragePlantTemperature')} ({t('Last')} 18 {t('Days')})
              </Text>
            </View>
            <View
              style={useInlineStyle({
                position: 'absolute',
                left: 20,
                width: '100%',
                bottom: 12,
                zIndex: 1,
              })}>
              <AutoView isRow>
                <AutoView isRow>
                  <RadioIcon size={10} color="#40848b" />
                  <AutoText style={{paddingLeft: 5}}>{`≤21.0C`}</AutoText>
                </AutoView>
                <AutoView isRow style={{marginLeft: 10, marginRight: 10}}>
                  <RadioIcon size={10} color="#79d87f" />
                  <AutoText style={{paddingLeft: 5}}>{`≤21.0C`}</AutoText>
                </AutoView>
                <AutoView isRow>
                  <RadioIcon size={10} color="#df6175" />
                  <AutoText style={{paddingLeft: 5}}>{`≤21.0C`}</AutoText>
                </AutoView>
              </AutoView>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = createStyles({
  container: {
    padding: 20,
    paddingTop: 0,
    flex: 1,
  },
  backBtn: {
    backgroundColor: '#fff',
    width: 35,
    height: 30,
    borderColor: '#f4f4f4',
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
    fontSize: 14,
  },
  backBtn:{
    backgroundColor: '#fff',
    width: 35,
    height: 30,
    borderColor: '#f4f4f4',
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  }
});

export default Plan;

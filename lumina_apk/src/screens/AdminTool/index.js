import React, { useState } from 'react';
import { Text, View, Switch } from 'react-native';
import { IconButton, TextButton } from 'src/components/Button';
import TouchBtnGroup from 'src/components/TouchBtnGroup';
import {
  adaptationConvert,
  createStyles,
  useInlineStyle,
} from 'src/helpers/style';
import Slider from '@react-native-community/slider';
import AutoView from 'src/components/AutoView/View';
import ShadowCard from 'src/components/Shadow';
import { IconJiantouCopy, IconShuaxin } from 'src/iconfont';
import { fontName } from 'src/constants/font';
import AutoText from 'src/components/AutoView/Text';
import SwitchView from 'src/components/Switch';
import EChartLine from './EChartLine';
import SlideView from './SlideView';
import { useTranslation } from 'react-i18next';
import { getMonth } from 'src/helpers/utils';
import ScreenHeader from 'src/components/ScreenHeader';
import RadioIcon from 'src/components/RadioIcon';
import { useRoute } from '@react-navigation/native';
import colors from 'src/constants/colors';

const AdminTool = (props) => {
  const [isAutoClimate, setIsAutoClimate] = useState(false);
  const [isAutoFlower, setIsAutoFlower] = useState(false);
  const routes = useRoute();
  const cardData = routes.params.cardItem;
  const childData = routes.params.propsItem;
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <ScreenHeader title={t("Bright Renaissance")} otherNode={() => {
        return (
          <>
            <Text style={styles.headerText2}>
              <Text
                style={
                  styles.headerText3
                }>{`[${t('Bright Renaissance')} - ${t("Zone")} A ${t("Room")} #${childData.serial_number} -`}</Text>
            </Text>
            <RadioIcon color={colors.checked} size={10} style={{ paddingBottom: 0 }} />
            <View>
              <Text
                style={
                  styles.headerText3
                }>{`${t('Aisle')} #${cardData.serial_number}]`}</Text>
            </View>
          </>
        )
      }
      }
        right={
          () => {
            return (

              <AutoView
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: colors.borderColor,
                  paddingLeft: 15,
                  paddingRight: 15,
                  paddingTop:20,
                  paddingBottom:20,
                }}
                isRow>
                <IconButton>
                  <IconShuaxin size={adaptationConvert(26)} color="#000" />
                </IconButton>
                <AutoText size={24} style={{ color: '#2a2a2a', paddingLeft: 16 }}>
                  {t('RestoreToDefaults')}
                </AutoText>
              </AutoView>
            )
          }
        } />
      <AutoView
        isRow
        style={{
          flex: 1,
          backgroundColor: '#fff',
          padding: 32,
          alignItems: 'flex-start',
          paddingTop: 30,
          paddingLeft: 32,
          marginTop: 20,
        }}>
        <AutoView style={{width:'30%'}}>
          <AutoView>
            <AutoText size={28} style={{ color: '#000',paddingTop:5, }}>
              {t('PhaseControl')}
            </AutoText>
            <AutoView
              style={{
                marginTop: 12,
                marginLeft: 5,
                borderColor: colors.borderColor,
                borderWidth: 1,
                borderRadius: 10,
              }}>
              <AutoView style={{ height: 60 }} isRow>
                <AutoText
                  style={{ color: '#2a2a2a', paddingLeft: 15, paddingRight: 20 }}>
                  {t('CurrentPhase')} ({t('Germination')}:6~7 {t('days')})
                </AutoText>
              </AutoView>
              <AutoView
                isRow
                style={{
                  borderTopWidth: 1,
                  borderColor: colors.borderColor,
                  alignItems: 'center',
                  height: 60,
                  justifyContent: 'space-between',
                  paddingLeft: 20,
                  paddingRight: 20,
                }}>
                <AutoText style={{ color: '#2a2a2a' }}>{t('Duration')}</AutoText>
                <IconButton>
                  <AutoText style={{ color: '#559f18' }}>{t('AddTrayRow')}</AutoText>
                </IconButton>
              </AutoView>
            </AutoView>
            <AutoText style={{ paddingTop: 12 }} numberOfLines={2} size={22}>
              {t('PhaseControlTips')}
            </AutoText>
          </AutoView>
          <AutoView style={{ marginTop: 48 }}>
            <AutoText size={26} style={{ color: '#000' }}>
              {t('Days')}/{t('NightChamberTemperature')}
            </AutoText>
            <AutoView
              style={{
                marginTop: 20,
                marginLeftLeft: 5,
                borderColor: colors.borderColor,
                borderWidth: 1,
                borderRadius: 10,
              }}>
              <AutoView
                style={{
                  height: 60,
                  justifyContent: 'space-between',
                  position: 'relative',
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                isRow>
                <AutoText style={{ color: '#2a2a2a' }}>{t('AutoClimate')}</AutoText>
                <SwitchView
                  defaultValue={false}
                  style={{
                    position: 'absolute',
                    right: -15,
                  }}
                />
              </AutoView>
              <AutoView
                isRow
                style={{
                  borderTopWidth: 1,
                  borderColor: colors.borderColor,
                  alignItems: 'center',
                  height: 60,
                  paddingLeft: 20,
                  paddingRight: 20,
                  justifyContent: 'space-between',
                }}>
                <AutoText style={{ color: '#2a2a2a' }}>{t('Duration')}</AutoText>
                <AutoView isRow>
                  <TouchBtnGroup
                    data={[t('off'), 'A/C', t('Heating')]}
                    defaultIndex={0}
                  />
                </AutoView>
              </AutoView>
            </AutoView>
            <AutoText style={{ paddingTop: 12 }} size={22}>
              {t('temperatureTips')}
            </AutoText>
          </AutoView>
          <AutoView style={{ marginTop: 48 }}>
            <AutoText size={26} style={{ color: '#000' }}>
              {t('Flowering')}
            </AutoText>
            <AutoView
              style={{
                marginTop: 10,
                marginLeftLeft: 5,
                borderColor: colors.borderColor,
                borderWidth: 1,
                borderRadius: 10,
              }}>
              <AutoView
                style={{
                  height: 60,
                  justifyContent: 'space-between',
                  position: 'relative',
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                isRow>
                <AutoText style={{ color: '#2a2a2a' }}>
                  {t('AutoFloweringTrigger')}
                </AutoText>
                <SwitchView
                  defaultValue={false}
                  style={{
                    position: 'absolute',
                    right: -15,
                  }}
                />
              </AutoView>
              <AutoView
                isRow
                style={{
                  borderTopWidth: 1,
                  borderColor: colors.borderColor,
                  alignItems: 'center',
                  height: 60,
                  justifyContent: 'space-between',
                  paddingLeft: 20,
                  paddingRight: 20,
                }}>
                <AutoText style={{ color: '#2a2a2a' }}>{t('ManualTrigger')}</AutoText>
                <IconButton>
                  <AutoText style={{ color: '#559f18' }}>30cm</AutoText>
                </IconButton>
              </AutoView>
            </AutoView>
            <AutoText style={{ paddingTop: 8 }} size={22}>
              {t('floweringTips')}
            </AutoText>
          </AutoView>
        </AutoView>

        <AutoView
          style={{
            width: '30%',
            marginLeft: 20,
          }}>
          <AutoText size={28} style={{ color: '#000',paddingTop:5 }}>
            {t('LightingSystem')}
          </AutoText>
          <AutoView
            style={{
              borderWidth: 1,
              borderColor: colors.borderColor,
              borderRadius: 10,
              marginTop: 10,
            }}>
            <AutoView
              style={{
                height: 60,
                justifyContent: 'space-between',
                position: 'relative',
                paddingLeft: 20,
                paddingRight: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#f4f4f4',
              }}
              isRow>
              <AutoText style={{ color: '#2a2a2a' }}>{t('AutoClimate')}</AutoText>
              <SwitchView
                defaultValue={false}
                style={{
                  position: 'absolute',
                  right: -15,
                }}
              />
            </AutoView>
            <AutoView
              style={{
                height: 240,
                position: 'relative',
                marginTop: 0,
                marginBottom:32,
              }}>
              <AutoView
                style={{
                  position: 'absolute',
                  height: '190%',
                  left: 20,
                  top: -100,
                  width: '100%',
                }}>
                <EChartLine />
              </AutoView>
            </AutoView>
            {
              [t('UV-B'), t('DeepBlue'), t('Main'), `${t('Hyper')}`, t('FarRed')].map((item, index) => {
                return (
                  <SlideView title={item} key={index} />
                )
              })
            }
          </AutoView>
          <AutoText size={22} style={{ paddingTop: 8 }}>
            {t('systemTips')}
          </AutoText>
        </AutoView>
      </AutoView>
    </View>
  );
};

const styles = createStyles({
  container: {
    padding: 32,
    paddingTop: 0,
    paddingLeft: 32,
    flex: 1,
  },
  backBtn: {
    backgroundColor: '#fff',
    width: 35,
    height: 30,
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 10,
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
  },
});

export default AdminTool;

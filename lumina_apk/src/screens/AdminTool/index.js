import React, {useState} from 'react';
import {Text, View, Switch} from 'react-native';
import {IconButton, TextButton} from 'src/components/Button';
import TouchBtnGroup from 'src/components/TouchBtnGroup';
import {
  adaptationConvert,
  createStyles,
  useInlineStyle,
} from 'src/helpers/style';
import Slider from '@react-native-community/slider';
import AutoView from 'src/components/AutoView/View';
import ShadowCard from 'src/components/Shadow';
import {IconJiantouCopy, IconShuaxin} from 'src/iconfont';
import {fontName} from 'src/constants/font';
import AutoText from 'src/components/AutoView/Text';
import SwitchView from 'src/components/Switch';
import EChartLine from './EChartLine';
import SlideView from './SlideView';
import { useTranslation } from 'react-i18next';
import { getMonth } from 'src/helpers/utils';

const AdminTool = (props) => {
  const [isAutoClimate, setIsAutoClimate] = useState(false);
  const [isAutoFlower, setIsAutoFlower] = useState(false);
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={[styles.flex, styles.header]}>
        <AutoView isRow>
          <ShadowCard style={styles.backBtn}>
            <IconButton onPress={() => props.navigation.goBack()}>
              <IconJiantouCopy size={adaptationConvert(16)} />
            </IconButton>
          </ShadowCard>

          <View style={useInlineStyle({paddingTop: 3})}>
            <Text style={styles.headerText1}>{t('Bright Renaissance')}</Text>
            <View
              style={[
                styles.flex,
                {alignItems: 'center', justifyContent: 'flex-start'},
              ]}>
              <View>
                <Text style={styles.headerText2}>
                {t(getMonth())} {new Date().getDate()},{new Date().getFullYear()}
                  <Text
                    style={
                      styles.headerText3
                    }>{`[${t('Bright Renaissance')} - ${t('Zone')} A ${t('Room')} #1 -`}</Text>
                </Text>
              </View>
              <View>
                <Text style={styles.headerText3}>{`Aisle #001]`}</Text>
              </View>
            </View>
          </View>
        </AutoView>

        <AutoView
          style={{
            backgroundColor: '#fff',
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#f4f4f4',
            height: 40,
            paddingLeft: 15,
            paddingRight: 15,
          }}
          isRow>
          <IconButton>
            <IconShuaxin size={adaptationConvert(20)} color="#000" />
          </IconButton>
          <AutoText size={12} style={{color: '#2a2a2a', paddingLeft: 8}}>
            {t('RestoreToDefaults')}
          </AutoText>

          {/* <ProgressBarIcon value={60} /> */}
        </AutoView>
      </View>
      <AutoView
        isRow
        style={{
          flex: 1,
          backgroundColor: '#fff',
          padding: 15,
          alignItems: 'flex-start',
          paddingTop: 30,
          paddingLeft: 20,
          marginTop: 20,
        }}>
        <AutoView style={{width: 400}}>
          <AutoView>
            <AutoText size={16} style={{color: '#000'}}>
              {t('PhaseControl')}
            </AutoText>
            <AutoView
              style={{
                marginTop: 10,
                marginLeftLeft: 5,
                borderColor: '#f4f4f4',
                borderWidth: 1,
                borderRadius: 5,
              }}>
              <AutoView style={{height: 40}} isRow>
                <AutoText
                  style={{color: '#2a2a2a', paddingLeft: 20, paddingRight: 20}}>
                  {t('CurrentPhase')} ({t('Germination')}:6~7 {t('days')})
                </AutoText>
              </AutoView>
              <AutoView
                isRow
                style={{
                  borderTopWidth: 1,
                  borderColor: '#f4f4f4',
                  alignItems: 'center',
                  height: 40,
                  justifyContent: 'space-between',
                  paddingLeft: 20,
                  paddingRight: 20,
                }}>
                <AutoText style={{color: '#2a2a2a'}}>{t('Duration')}</AutoText>
                <IconButton>
                  <AutoText style={{color: '#559f18'}}>{t('AddTrayRow')}</AutoText>
                </IconButton>
              </AutoView>
            </AutoView>
            <AutoText style={{paddingTop: 8}} size={12}>
              {t('PhaseControlTips')}
            </AutoText>
          </AutoView>
          <AutoView style={{marginTop: 30}}>
            <AutoText size={16} style={{color: '#000'}}>
              {t('Days')}/{t('NightChamberTemperature')}
            </AutoText>
            <AutoView
              style={{
                marginTop: 10,
                marginLeftLeft: 5,
                borderColor: '#f4f4f4',
                borderWidth: 1,
                borderRadius: 5,
              }}>
              <AutoView
                style={{
                  height: 40,
                  justifyContent: 'space-between',
                  position: 'relative',
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                isRow>
                <AutoText style={{color: '#2a2a2a'}}>{t('AutoClimate')}</AutoText>
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
                  borderColor: '#f4f4f4',
                  alignItems: 'center',
                  height: 40,
                  paddingLeft: 20,
                  paddingRight: 20,
                  justifyContent: 'space-between',
                }}>
                <AutoText style={{color: '#2a2a2a'}}>{t('Duration')}</AutoText>
                <AutoView isRow>
                  <TouchBtnGroup
                    data={[t('off'), 'A/c', t('Heating')]}
                    defaultIndex={0}
                  />
                </AutoView>
              </AutoView>
            </AutoView>
            <AutoText style={{paddingTop: 8}} size={12}>
              {t('temperatureTips')}
            </AutoText>
          </AutoView>
          <AutoView style={{marginTop: 30}}>
            <AutoText size={16} style={{color: '#000'}}>
              {t('Flowering')}
            </AutoText>
            <AutoView
              style={{
                marginTop: 10,
                marginLeftLeft: 5,
                borderColor: '#f4f4f4',
                borderWidth: 1,
                borderRadius: 5,
              }}>
              <AutoView
                style={{
                  height: 40,
                  justifyContent: 'space-between',
                  position: 'relative',
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                isRow>
                <AutoText style={{color: '#2a2a2a'}}>
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
                  borderColor: '#f4f4f4',
                  alignItems: 'center',
                  height: 40,
                  justifyContent: 'space-between',
                  paddingLeft: 20,
                  paddingRight: 20,
                }}>
                <AutoText style={{color: '#2a2a2a'}}>{t('ManualTrigger')}</AutoText>
                <IconButton>
                  <AutoText style={{color: '#559f18'}}>30cm</AutoText>
                </IconButton>
              </AutoView>
            </AutoView>
            <AutoText style={{paddingTop: 8}} size={12}>
              {t('floweringTips')}
            </AutoText>
          </AutoView>
        </AutoView>

        <AutoView
          style={{
            width: 400,
            marginLeft: 20,
          }}>
          <AutoText size={16} style={{color: '#000'}}>
           {t('LightingSystem')}
          </AutoText>
          <AutoView
            style={{
              borderWidth: 1,
              borderColor: '#f4f4f4',
              borderRadius: 10,
              marginTop: 10,
            }}>
            <AutoView
              style={{
                height: 40,
                justifyContent: 'space-between',
                position: 'relative',
                paddingLeft: 20,
                paddingRight: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#f4f4f4',
              }}
              isRow>
              <AutoText style={{color: '#2a2a2a'}}>{t('AutoClimate')}</AutoText>
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
                height: 160,
                position: 'relative',
                marginTop: 10,
              }}>
              <AutoView
                style={{
                  position: 'absolute',
                  height: 350,
                  left: 20,
                  top: -100,
                  width: 200,
                }}>
                <EChartLine />
              </AutoView>
            </AutoView>
            {
              [t('UV-B'),t('DeepBlue'),t('Main'),t('HyperRed'),t('FarRed')].map((item,index)=>{
                return (
                  <SlideView title={item} key={index} />
                )
              })
            }
          </AutoView>
          <AutoText size={12} style={{paddingTop:8}}>
         {t('systemTips')}
          </AutoText>
        </AutoView>
      </AutoView>
    </View>
  );
};

const styles = createStyles({
  container: {
    padding: 30,
    paddingTop: 0,
    paddingLeft: 20,
    flex: 1,
  },
  backBtn: {
    backgroundColor: '#fff',
    width: 35,
    height: 30,
    borderColor: '#f4f4f4',
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
    fontSize: 12,
  },
});

export default AdminTool;

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
import { useTranslation } from 'react-i18next';
import { getMonth } from 'src/helpers/utils';
import ScreenHeader from 'src/components/ScreenHeader';
import RadioIcon from 'src/components/RadioIcon';
import { useRoute } from '@react-navigation/native';
import colors from 'src/constants/colors';

const AdminToolHeader=()=>{
    const routes = useRoute();
    const cardData = routes.params?.cardItem || {};
    const childData = routes.params?.propsItem || {};
    const { t } = useTranslation();
    return (
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
    
                  <ShadowCard
                    style={{
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: colors.borderColor,
                      paddingLeft: 15,
                      paddingRight: 15,
                      paddingTop: 15,
                      paddingBottom: 15,
                    }}
                    isRow>
                    <AutoView isRow>
                      <IconButton>
                        <IconShuaxin size={adaptationConvert(26)} color="#000" />
                      </IconButton>
                      <AutoText size={35} style={{ color: '#2a2a2a', paddingLeft: 16 }}>
                        {t('RestoreToDefaults')}
                      </AutoText>
                    </AutoView>
    
                  </ShadowCard>
                )
              }
            } />
    )
}
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
  
export default AdminToolHeader;
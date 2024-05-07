import React, { useState } from 'react';
import { Text, View, Switch, StyleSheet } from 'react-native';
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
import SpaceBetween from 'src/components/FlexView/SpaceBetween';
import Start from 'src/components/FlexView/Start';
import Back from 'src/components/ScreenHeader/Back';
import { FONT_SIZE } from 'src/constants/style';

const AdminToolHeader = () => {
  const routes = useRoute();

 
  const { t } = useTranslation();
  const { device_id, roomName, devicesName, cropNams } = routes.params;
  return (
    <SpaceBetween>
      <Start>
        <Back noneText={true} />
        <AutoText style={{ fontWeight: '700', fontSize: FONT_SIZE.title, color: '#4a4a4a' }}>{`${roomName} | ${devicesName}`}</AutoText>
      </Start>
    </SpaceBetween>
  )
}
const styles = StyleSheet.create({
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
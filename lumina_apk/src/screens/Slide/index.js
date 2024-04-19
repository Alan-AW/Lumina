import React, { useState, useRef, useEffect } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Animated, Easing, TouchableOpacity } from 'react-native';
import { IconButton } from 'src/components/Button';
import {
  IconBaogao,
  IconKongxinwenhao,
  IconShezhi,
  IconShizhong,
  IconXiangji,
  IconZidingyicaidan,
} from 'src/iconfont';
import colors from 'src/constants/colors';
import { adaptationConvert, createStyles, useInlineStyle } from 'src/helpers/style';
import Badge from 'src/components/Badge';
import { useAppSelector } from 'src/reduxCenter/hooks';
import { baseUrl } from 'src/apis/config';
import ShadowCard from 'src/components/Shadow';

const checkedColor = '#2a2a2a';

const defaultColor = '#fff';

const iconContainerSize = 68;
const iconSize = 47;
const TabItem = ({ isActive, onPress, children }) => {
  const translateY = new Animated.Value(0);
  const interpolatedColor = translateY.interpolate({
    inputRange: [0, 1],
    outputRange: [defaultColor, checkedColor],
  });
  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isActive ? 1 : 0, // 最终值为1
      duration: 600, // 过渡时间
      easing: Easing.linear, // 过渡效果
      useNativeDriver: true,
    }).start();
  }, [isActive]);
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[{ backgroundColor: interpolatedColor }, styles.tabItem]}
      activeOpacity={1}>
      {children}
    </TouchableOpacity>
  );
};

const VerticalTabMenu = (props) => {
  const [activeTab, setActiveTab] = useState(props.currentRoute);

  const navigation = useNavigation();
  const state = useAppSelector((state) => state.user.userInfo)


  const handleTabPress = index => {
    setActiveTab(index);
    if (index === 0) {
      navigation.navigate('Home');
    }
    // if (index === 1) {
    //   navigation.navigate('Home');
    // }
    if (index === 2) {
      navigation.navigate('Splash');
    }
  };




  return (
    <View style={styles.container}>
    <View
      style={{
        position: 'relative',
        zIndex: 6,
        alignItems: 'center',
        height: '100%',
      }}>
      <View>
        <IconButton style={styles.logoBtn} disabled={true}>
          <Image
            style={styles.logo}
            source={require('../../asset/img/logo.png')}
          />
        </IconButton>
      </View>

      <View style={useInlineStyle({ marginTop: 40 })}>
        <TabItem isActive={props.currentRoute === 'Home'} onPress={() => {
          navigation.reset({
            index: 1,
            routes: [{ name: 'Home' }],
          });
        }}>
          <IconZidingyicaidan
            size={adaptationConvert(iconSize - 13)}
            color={props.currentRoute === 'Home' ? defaultColor : checkedColor}
          />
        </TabItem>
        {/* <TabItem isActive={props.currentRoute === 'VideoPreview'} onPress={() => {
        navigation.reset({
          index: 1,
          routes: [{ name: 'VideoPreview' }],
        });
      }}>
        <IconXiangji
          size={adaptationConvert(iconSize)}
          color={props.currentRoute === 'VideoPreview' ? defaultColor : checkedColor}
        />
      </TabItem> */}
        {/* <TabItem isActive={props.currentRoute === 'baogao'} onPress={() => { }}>
        <IconBaogao
          size={adaptationConvert(itemSize)}
          color={props.currentRoute === 'baogao' ? defaultColor : checkedColor}
        />
        <Badge count={2} style={{ position: 'absolute', top: 10, right: 10 }} />
      </TabItem>
        <Badge count={2} style={{ position: 'absolute', top: -5, left: 30 }} />
      </TabItem> */}
        <TabItem isActive={props.currentRoute === 'Log'} onPress={() => {
          navigation.reset({
            index: 1,
            routes: [{ name: 'Log' }],
          });
        }}>
          <IconShizhong
            size={adaptationConvert(iconSize)}
            color={props.currentRoute === 'Log' ? defaultColor : checkedColor}
          />
        </TabItem>
        {/* <TabItem isActive={props.currentRoute === 'Setting'} onPress={() => {
        navigation.reset({
          index: 1,
          routes: [{ name: 'Setting' }],
        });
      }}>
        <IconShezhi
          size={adaptationConvert(iconSize)}
          color={props.currentRoute === 'Setting' ? defaultColor : checkedColor}
        />
      </TabItem> */}
      </View>

      <View style={useInlineStyle({ position: 'absolute', bottom: 60 })}>
        <IconButton style={styles.logo2} onPress={() => {
          navigation.reset({
            index: 1,
            routes: [{ name: 'User' }],
          });
        }}>
          {
            state && state.avatar && <Image source={{ uri: `${baseUrl + state.avatar}` }} style={{ width: '100%', height: '100%' }} />
          }

        </IconButton>
        {/* <IconButton style={styles.helpBtn}>
        <IconKongxinwenhao size={adaptationConvert(iconSize-10)} />
      </IconButton> */}
      </View>
    </View>
  </View>

  );
};

const styles = createStyles({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
    paddingBottom: 0,
    position: 'relative',
    borderRadius: 10,
    justifyContent: 'flex-start',
    // borderRightWidth: 1,
    // borderColor: '#f4f4f4',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: iconContainerSize,
    width: iconContainerSize,
    position: 'relative',
    zIndex: 6,
    borderRadius: 8,
    marginBottom: 40,
    justifyContent: 'center',
  },
  logo: {
    width: iconContainerSize,
    height: iconContainerSize,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoBtn: {
    width: iconContainerSize,
    height: iconContainerSize,
    marginBottom: 20,
  },
  logo2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: iconContainerSize,
    width: iconContainerSize,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 50,
  },
  text1: {
    fontSize: 26,
    color: colors.checked,
    fontWeight: '400',
  },
  text2: {
    fontSize: 20,
    color: colors.checked,
    fontWeight: '500',
  },
  helpBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: iconContainerSize,
    width: iconContainerSize,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default VerticalTabMenu;

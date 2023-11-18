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

const checkedColor = '#2a2a2a';

const defaultColor = '#fff';

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
          <IconButton style={styles.logoBtn}>
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
              size={adaptationConvert(25)}
              color={props.currentRoute === 'Home' ? defaultColor : checkedColor}
            />
          </TabItem>
          <TabItem isActive={props.currentRoute === 'VideoPreview'} onPress={() => {
            navigation.reset({
              index: 1,
              routes: [{ name: 'VideoPreview' }],
            });
          }}>
            <IconXiangji
              size={adaptationConvert(38)}
              color={props.currentRoute === 'VideoPreview' ? defaultColor : checkedColor}
            />
          </TabItem>
          <TabItem isActive={props.currentRoute === 'baogao'} onPress={() => { }}>
            <IconBaogao
              size={adaptationConvert(38)}
              color={props.currentRoute === 'baogao' ? defaultColor : checkedColor}
            />
            <Badge count={2} style={{ position: 'absolute', top: -5, left: 30 }} />
          </TabItem>
          <TabItem isActive={props.currentRoute === 'shizhong'} onPress={() => { }}>
            <IconShizhong
              size={adaptationConvert(38)}
              color={props.currentRoute === 'shizhong' ? defaultColor : checkedColor}
            />
          </TabItem>
          <TabItem isActive={props.currentRoute === 'Setting'} onPress={() => {
            navigation.reset({
              index: 1,
              routes: [{ name: 'Setting' }],
            });
          }}>
            <IconShezhi
              size={adaptationConvert(38)}
              color={props.currentRoute === 'Setting' ? defaultColor : checkedColor}
            />
          </TabItem>
        </View>

        <View style={useInlineStyle({ position: 'absolute', bottom: 30 })}>
          <IconButton style={styles.logo2}>
            <Image source={require('../../asset/img/user.jpg')} style={{ width: '100%', height: '100%' }} />
          </IconButton>
          <IconButton style={styles.helpBtn}>
            <IconKongxinwenhao size={adaptationConvert(28)} />
          </IconButton>
        </View>
      </View>
    </View>
  );
};

const styles = createStyles({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    flex: 1,
    padding: 20,
    paddingBottom:0,
    position: 'relative',
    borderRadius: 20,
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
    position: 'relative',
    zIndex: 6,
    borderRadius: 8,
    marginBottom: 40,
    justifyContent: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    alignItems:'center',
    justifyContent:'center'
  },
  logoBtn: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  logo2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 60,
    width: 60,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 10,
    overflow: 'hidden'
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
    height: 60,
    width: 60,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default VerticalTabMenu;

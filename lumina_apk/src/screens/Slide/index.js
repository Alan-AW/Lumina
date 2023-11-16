import React, {useState, useRef, useEffect} from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';
import {useNavigation,useRoute} from '@react-navigation/native';
import {View, Text, Animated, Easing, TouchableOpacity} from 'react-native';
import {IconButton} from 'src/components/Button';
import {
  IconBaogao,
  IconKongxinwenhao,
  IconShezhi,
  IconShizhong,
  IconXiangji,
  IconZidingyicaidan,
} from 'src/iconfont';
import colors from 'src/constants/colors';
import {adaptationConvert, useInlineStyle} from 'src/helpers/style';
import Badge from 'src/components/Badge';

const checkedColor = '#2a2a2a';

const defaultColor = '#fff';

const TabItem = ({isActive, onPress, children}) => {
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
      style={[{backgroundColor: interpolatedColor}, styles.tabItem]}
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

        <View style={useInlineStyle({marginTop: 40})}>
          <TabItem isActive={props.currentRoute==='Home'} onPress={() => navigation.navigate('Home')}>
            <IconZidingyicaidan
              size={adaptationConvert(16)}
              color={props.currentRoute==='Home' ? defaultColor : checkedColor}
            />
          </TabItem>
          <TabItem isActive={ props.currentRoute=== 'VideoPreview'} onPress={() => navigation.navigate('VideoPreview')}>
            <IconXiangji
              size={adaptationConvert(22)}
              color={props.currentRoute=== 'VideoPreview' ? defaultColor : checkedColor}
            />
          </TabItem>
          <TabItem isActive={props.currentRoute=== 'baogao' } onPress={()=>{}}>
            <IconBaogao
              size={adaptationConvert(22)}
              color={props.currentRoute=== 'baogao' ? defaultColor : checkedColor}
            />
            <Badge count={2} style={{position:'absolute',top:0,right:0}} />
          </TabItem>
          <TabItem isActive={props.currentRoute=== 'shizhong' } onPress={()=>{}}>
            <IconShizhong
              size={adaptationConvert(22)}
              color={props.currentRoute=== 'shizhong'  ? defaultColor : checkedColor}
            />
          </TabItem>
          <TabItem isActive={props.currentRoute=== 'Setting' } onPress={() => navigation.navigate('Setting')}>
            <IconShezhi
              size={adaptationConvert(22)}
              color={props.currentRoute=== 'Setting'  ? defaultColor : checkedColor}
            />
          </TabItem>
        </View>

        <View style={useInlineStyle({position: 'absolute', bottom: 30})}>
          <IconButton style={styles.logo2}>
            <Text style={styles.text1}>J</Text>
            <Text style={styles.text2}>T</Text>
          </IconButton>
          <IconButton style={styles.helpBtn}>
            <IconKongxinwenhao size={adaptationConvert(22)} />
          </IconButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    flex: 1,
    padding: 5,
    position: 'relative',
    borderRadius: 10,
    justifyContent: 'flex-start',
    width: 35,
    borderWidth: 1,
    borderColor: '#f4f4f4',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    width: 20,
    position: 'relative',
    zIndex: 6,
    borderRadius: 4,
    marginBottom: 10,
    justifyContent: 'center',
  },
  logo: {
    width: 25,
    height: 25,
  },
  logoBtn: {
    width: 25,
    height: 20,
    marginBottom: 10,
  },
  logo2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: '#daebc6',
    borderRadius: 2,
  },
  text1: {
    fontSize: 13,
    color: colors.checked,
    fontWeight: '400',
  },
  text2: {
    fontSize: 10,
    color: colors.checked,
    fontWeight: '500',
  },
  helpBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 2,
    marginTop: 10,
  },
});

export default VerticalTabMenu;

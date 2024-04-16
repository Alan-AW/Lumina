import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import type { AppStackParamList } from './types';
import { SplashScreen } from '../screens';
import { Login } from '../screens';
import { AdminTool } from '../screens';
import { View } from 'react-native';

import { createStyles } from 'src/helpers/style';
import VerticalTab from 'src/screens/Slide';
import { useAppDispatch, useAppSelector } from 'src/reduxCenter/hooks';
import QrCode from 'src/screens/Login/Qrcode';
// import storage from 'src/helpers/storage';
import { loginInSuccess } from 'src/reduxCenter/actionCreators';
import Home from 'src/screens/Home';
import Plan from 'src/screens/Plan';
import Bright from 'src/screens/Bright';
import VideoPrew from 'src/screens/VideoPrew';
import Setting from 'src/screens/Setting';
import User from 'src/screens/User';
import AddPage from 'src/screens/SelectPage';
import { useTranslation } from 'react-i18next';
import storage from 'src/helpers/storage';
import internet from '@react-native-community/netinfo'
import { locales } from 'src/helpers/localesText';
import ToastService from 'src/helpers/toast';
import Update from 'src/screens/Update';
import Log from 'src/screens/Log';
const AppStack = createNativeStackNavigator<AppStackParamList>();
function AppStackNavigator() {

  return (
    <AppStack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        autoHideHomeIndicator: true, // 禁用切换动画
        animation: 'fade',
        contentStyle: { backgroundColor: '#fffcf7' },
      }}>
      <AppStack.Screen
        name="AddPage"
        component={AddPage}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="User"
        component={User}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="QrCode"
        component={QrCode}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Plan"
        component={Plan}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Bright"
        component={Bright}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="AdminTools"
        component={AdminTool}
        options={{ headerShown: false }}
      />
        <AppStack.Screen
        name="Log"
        component={Log}
        options={{ headerShown: false }}
      />
      {/* <AppStack.Screen
        name="VideoPreview"
        component={VideoPrew}
        options={{ headerShown: false }}
      /> */}
      {/* <AppStack.Screen
        name="Setting"
        component={Setting}
        options={{ headerShown: false }}
      /> */}
      <AppStack.Screen
        name="Update"
        component={Update}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
}

export default function Router() {
  const [currentRoute, setCurrentRoute] = useState('Home');
  const isHiddenSlider = useAppSelector(state => state.config.isHiddenSlider);
  //更新语言信息
  const { i18n } = useTranslation();
  useEffect(() => {
    if(i18n.language){
      storage.save({
        key: 'language',
        data: i18n.language
      })
    }
 

  }, [i18n.language])

  // useEffect(()=>{
  //   internet.addEventListener(state=>{
  //     const status=state.isConnected?locales.networkSuccess:locales.networkError;
  //    // ToastService.showToast(status)
  //   })
  // },[])


  return (
    <View style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
      <View style={{ flex: 1 }}>
        <SafeAreaProvider>
          <NavigationContainer
            onStateChange={(event: any) => {
              console.log('onStateChange', event);
              if (event && event.routes.length > 0) {
                const findRouteItem = event.routes.find((i: any) => i.name === currentRoute);
                if (!findRouteItem) {
                  setCurrentRoute(event.routes[event.routes.length - 1].name)
                }

              }

            }}>
            <View style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
              {!isHiddenSlider && (
                <View style={styles.sidle}>
                  <VerticalTab currentRoute={currentRoute} />
                </View>
              )}

              <View
                style={{ flex: 1, paddingTop: 0, backgroundColor: '#fffcf7' }}>
                <AppStackNavigator />
              </View>
            </View>
          </NavigationContainer>
        </SafeAreaProvider>
      </View>
    </View>
  );
}

const styles = createStyles({
  sidle: {
    backgroundColor: '#fff',
  },
});

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './reduxCenter';
import Router from './router';
import UseModal from './components/Modal';
import DialogServer from './helpers/modal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import './helpers/i18next';
import { StatusBar } from "react-native";
import storage from './helpers/storage';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_EN } from './store/authStore';
import { checkDevicesAuth } from './utils';
import * as echarts from 'echarts/core';
import {SvgChart, SVGRenderer,SkiaChart} from '@wuba/react-native-echarts';
import {BarChart,LineChart} from 'echarts/charts';
import {DataZoomComponent
} from 'echarts/components';

// 注册扩展组件
echarts.use([
  SVGRenderer,
  BarChart,
  DataZoomComponent,
  LineChart,
]);



export default function App() {

  useEffect(()=>{
    checkDevicesAuth()
  },[])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" backgroundColor="rgb(255,255,245)" />
        <Router />
        <UseModal ref={ref => DialogServer.initDialog(ref)} />
      </Provider>
    </GestureHandlerRootView>
  );
}

import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './reduxCenter';
import Router from './router';
import UseModal from './components/Modal';
import DialogServer from './helpers/modal';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import './helpers/i18next';
import { StatusBar } from "react-native";





export default function App() {
  useEffect(()=>{
   //Orientation.lockToLandscapeLeft()
  },[])
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor="rgb(255,255,245)" />
        <Router />
        <UseModal ref={ref => DialogServer.initDialog(ref)} />
      </Provider>
    </GestureHandlerRootView>
);
}

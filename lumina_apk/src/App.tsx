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
import { RootSiblingParent } from 'react-native-root-siblings';




export default function App() {

  useEffect(() => {
    checkDevicesAuth()

  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootSiblingParent>
        <Provider store={store}>
          <StatusBar barStyle="dark-content" backgroundColor="rgb(255,255,245)" />
          <Router />
          <UseModal ref={ref => DialogServer.initDialog(ref)} />
        </Provider>
      </RootSiblingParent>

    </GestureHandlerRootView>
  );
}

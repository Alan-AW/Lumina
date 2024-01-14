import React from 'react';
import {useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {createStyles} from 'src/helpers/style';
import {useAppSelector} from 'src/reduxCenter/hooks';
import DialogServer from 'src/helpers/modal';
import storage from 'src/helpers/storage';
import Login from '../Login';

export default function Splash(props: any) {
  useEffect(() => {
    storage.remove({
      key: 'userInfo',
    });
    storage
      .load({key: 'userInfo'})
      .then(res => {
        props.navigation.navigate('Home');
      })
      .catch(err => {
        props.navigation.navigate('Login');
      });
  }, []);

  return <View></View>;
}

const styles = createStyles({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import { getIndexList } from 'src/apis/home';

import { useNavigation, useIsFocused } from '@react-navigation/native';
import {
  createStyles,
} from 'src/helpers/style';
import { useTranslation } from 'react-i18next';
import ScreenHeader from 'src/components/ScreenHeader';
import useRequest from 'src/hooks/useRequest';
import RenderItem from './Item';
import CustView from 'src/components/FlexView/CustView';
import { useAppDispatch, useAppSelector } from 'src/reduxCenter/hooks';
import Loading from 'src/components/Loading';
import { registerRefresh } from 'src/reduxCenter/actionCreators/refreshAction';
import useRegister from 'src/hooks/useRegister';
import useInterval from 'src/hooks/useInterVal';
import AutoText from 'src/components/AutoView/Text';

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function SubTitle() {
  const [currentTime, setCurrentTime] = useState('')
  const timer = useRef(null)
  useEffect(() => {

    timer.current = setInterval(() => {
      setCurrentTime(getCurrentDateTime())
    }, 1000);
    return () => {
      timer.current ? clearInterval(timer.current) : null
    }
  }, [])

  return <AutoText size={30}>{currentTime}</AutoText>
}

const Home = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { data, loading, refresh } = useRequest(getIndexList, { run: true })
  useRegister(() => {
    refresh()
  });

  console.log(data, 'home 请求的data');

  const renderData = useMemo(() => {
    if (!loading && Array.isArray(data)) {
      return data.map(item => {
        const { max_current, min_current, serial_number, id } = item.room_desc;
        return {
          roomData: {
            roomId: item.room_desc.id,
            max: item.room_desc.max_current,
            min: item.room_desc.min_current,
            roomName: serial_number,
          },
          device_list: item.units_desc
        }
      })
    }
    return [];

  }, [loading, data])
  const state = useAppSelector(state => state.user.userInfo);






  return (
    <View style={{ flex: 1 }}>
      <CustView padding={[0, 0, 0, 32]}>
        <ScreenHeader title={state.company_name} subtitle={<SubTitle />} hiddenBack />
      </CustView>
      <View style={styles.scroll}>
        <Loading loading={loading}>
          <ScrollView style={{ flex: 1 }}>
            {
              renderData.map((item, index) => {
                return (
                  <View key={index}>
                    <RenderItem item={item} navigation={navigation} refresh={refresh} />
                  </View>
                )
              })
            }
          </ScrollView>
        </Loading>
      </View>
    </View>
  );
};

const styles = createStyles({
  scroll: {
    paddingLeft: 0,
    paddingRight: 32,
    marginTop: 15,
    width: '100%',
    flex: 1,
    position: 'relative',
  },
});

export default Home;

import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  FlatList,
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

const Home = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { data, loading, refresh } = useRequest(getIndexList, { run: true })
  useRegister(() => {
    refresh()
  });

  const renderData = useMemo(() => {
    if (!loading && Array.isArray(data)) {
      return data.map(item => {
        const { max_current, min_current, serial_number, id } = item.room_desc;
        return {
          id,
          max: max_current,
          low: min_current,
          serial_number: serial_number,
          data: item.units_desc_list.map(_item => {
            return {
              ..._item,
              name2: _item.cropItemName,
              date: _item.cropItemDay,
              serial_number: _item.serial_number,
              img: _item.url,
              cropItemCycle: _item.cropItemCycle,
            }
          })
        }
      })
    }

  }, [loading])
  const state = useAppSelector(state => state.user.userInfo);


  return (
    <View style={{ flex: 1 }}>
      <CustView padding={[0, 0, 0, 32]}>
        <ScreenHeader title={t('Dashboard')} subtitle={`[${state.company_name}]`} hiddenBack />
      </CustView>
      <View style={styles.scroll}>
        <Loading loading={loading}>
          <View style={{}}>
            <FlatList
              data={renderData} // 您的数据数组
              renderItem={(abc, dd) => {
                return <RenderItem item={abc.item} navigation={navigation} />
              }} // 渲染列表项的函数
            />
          </View>
        </Loading>

      </View>
    </View>
  );
};

const styles = createStyles({
  scroll: {
    paddingLeft: 32,
    paddingRight: 32,
    marginTop: 15,
    width: '100%',
    flex: 1,
    position: 'relative',
  },
});

export default Home;

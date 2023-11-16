import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AutoView from 'src/components/AutoView/View';
import { IconButton } from 'src/components/Button';
import RadioIcon from 'src/components/RadioIcon';
import ShadowCard from 'src/components/Shadow';
import Badge from 'src/components/Badge';
import { getIndexList } from 'src/apis/home';

import colors from 'src/constants/colors';
import { fontName } from 'src/constants/font';
import { useNavigation } from '@react-navigation/native';
import {
  adaptationConvert,
  createStyles,
  useInlineStyle,
} from 'src/helpers/style';
import { IconBaogao, IconJinrujiantouxiao, IconShezhi } from 'src/iconfont';
import { useTranslation } from 'react-i18next';
import { getMonth } from 'src/helpers/utils';


function GetPercent(num, total) {
  num = parseFloat(num);
  total = parseFloat(total);
  if (isNaN(num) || isNaN(total)) {
    return "-";
  }
  return total <= 0 ? 0 : (Math.round(num / total * 10000) / 100.00);
}

const MyCustomProgressBar = props => {
  return (
    <View
      style={{
        width: '100%',
        height: 8,
        backgroundColor: '#f4f4f4',
        borderRadius: 50,
        position: 'relative',
      }}>
      <View
        style={{
          width: `${props.value}%`,
          backgroundColor: '#559e18',
          height: '100%',
          position: 'absolute',
          left: 0,
          borderRadius: 50,
        }}
      />
    </View>
  );
};

const Card = props => {
  const { t } = useTranslation();
  const { title1, title2, name, cropItemCycle,serial_number,img,id } = props.item;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Bright',{id,propsItem:props.propsItem,cardItem:{serial_number,currentDay:title2,max:cropItemCycle}})}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        console.log('高度', height);
      }}
      activeOpacity={1}
      style={useInlineStyle({
        marginRight: 15,
        position: 'relative',
        zIndex: 6,
        width: 160,
      })}>
      <AutoView isRow style={{ position: 'relative' }}>
        <RadioIcon
          color={colors.checked}
          size={10}
          style={{ position: 'absolute', left: -3 }}
        />
        <Text
          style={useInlineStyle({
            fontFamily: fontName.medium,
            fontSize: 14,
            color: '#000',
            paddingLeft: 20,
          })}>
          {t("Aisle")} #{serial_number}
        </Text>
      </AutoView>

      <Text
        style={useInlineStyle({
          fontFamily: fontName.medium,
          fontSize: 14,
          color: '#000',
          paddingTop: 5,
        })}>
        {t("Day")}{title2}
        <Text
          style={useInlineStyle({
            fontFamily: fontName.regular,
            fontSize: 12,
            color: '#000',
          })}>
          - {cropItemCycle} {t("Day Cycle")}
        </Text>
      </Text>
      <View style={useInlineStyle({ marginTop: 10 })}>
        <MyCustomProgressBar value={GetPercent(title2,cropItemCycle)} />
      </View>
      <Text
        style={useInlineStyle({
          fontFamily: fontName.bold,
          fontSize: 16,
          color: '#000',
          paddingTop: 10,
          paddingBottom: 10,
        })}>
        {name}
      </Text>
      <View
        style={useInlineStyle({
          backgroundColor: '#f6f6f6',
          borderRadius: 10,
          justifyContent: 'center',
          flexDirection: 'row',
        })}>
        <Image
          style={useInlineStyle({ width: 120, height: 120 })}
          //require('../../asset/img/cai.png')
          source={{uri:img}}
        />
      </View>
    </TouchableOpacity>
  );
};


const Home = () => {
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    getIndexList().then(res => {

      const _data = res.data.map(item => {

        const { max_current, min_current, serial_number } = item.room_desc;
        return {
          max: max_current,
          low: min_current,
          serial_number: serial_number,
          data: item.units_desc_list.map(_item => {
            return {
              ..._item,
              name2: _item.cropItemName,
              date: _item.cropItemDay,
              serial_number:_item.serial_number,
              img: _item.url,
              cropItemCycle: _item.cropItemCycle,
            }
          })
        }
      })
      //console.log('请求首页', JSON.stringify(res));
      setData(_data);
    });
  }, []);
  const renderItem = ({ item }) => (
    <ShadowCard style={styles.scrollItem}>
      <View style={styles.scrollContainer}>
        <View style={useInlineStyle({ width: 250 })}>
          <Text
            style={useInlineStyle({
              fontFamily: fontName.medium,
              fontSize: 14,
              color: '#000',
            })}>
            {t('Room')} #{item.serial_number}
          </Text>
          <View
            style={useInlineStyle({
              position: 'absolute',
              bottom: 0,
              justifyContent: 'flex-end',
            })}>
            <View
              style={useInlineStyle({
                backgroundColor: '#cbfaff',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                padding: 15,
                paddingBottom: 10,
              })}>

              <View>
                <Text
                  style={useInlineStyle({
                    fontFamily: fontName.bold,
                    color: '#000',
                    fontSize: 14,
                    paddingBottom: 5,
                  })}>
                  {item.max}
                </Text>
                <Text
                  style={useInlineStyle({
                    fontFamily: fontName.medium,
                    color: '#000',
                    fontSize: 10,
                    paddingBottom: 5,
                  })}>
                  {t('MaxCurrentTemperature')}
                </Text>
              </View>
              <View style={useInlineStyle({ marginTop: 5 })}>
                <Text
                  style={useInlineStyle({
                    fontFamily: fontName.bold,
                    color: '#000',
                    fontSize: 14,
                  })}>
                  {item.low}
                </Text>
                <Text
                  style={useInlineStyle({
                    fontFamily: fontName.medium,
                    color: '#000',
                    fontSize: 10,
                  })}>
                    {t('LowCurrentTemperature')}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <ScrollView horizontal style={{ minHeight: 118.25 }}>
          {item.data.map((item2, index) => {
            return (
              <Card
                key={index}
                propsItem={item}
                item={{
                  id:item2.id,
                  title1: item2.name1,
                  title2: item2.date,
                  name: item2.name2,
                  img:item2.img,
                  serial_number:item2.serial_number,
                  cropItemCycle: item2.cropItemCycle
                }}
              />
            );
          })}
        </ScrollView>
      </View>
    </ShadowCard>
  );
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText1}>{t('Dashboard')}</Text>
        <Text style={styles.headerText2}>
          {t(getMonth())} {new Date().getDate()},{new Date().getFullYear()}
          <Text style={styles.headerText3}>{`[ ${t("Bright Renaissance")} - ${t("Zone")} A]`}</Text>
        </Text>
      </View>
      <View style={styles.navContainer}>
        <ShadowCard style={styles.navItem}>
          <View style={styles.left}>
            <IconButton style={styles.navBtn}>
              <IconShezhi size={adaptationConvert(20)} color="#000" />
            </IconButton>
            <Text style={styles.navText}>{t("Settings")}</Text>
          </View>
          <IconJinrujiantouxiao size={adaptationConvert(20)} />
        </ShadowCard>
        <ShadowCard style={[styles.navItem, { marginLeft: 0 }]}>
          <View style={[styles.left]}>
            <IconButton style={[styles.navBtn, { backgroundColor: '#cbfaff' }]}>
              <IconBaogao size={adaptationConvert(20)} />
              <Badge
                count={2}
                style={{ position: 'absolute', top: -5, right: -5 }}
              />
            </IconButton>
            <Text style={styles.navText}>{t("Review Tickets")}</Text>
          </View>
          <IconJinrujiantouxiao size={adaptationConvert(20)} />
        </ShadowCard>
      </View>
      <View style={styles.scroll}>
        <View style={{ width: '96%' }}>
          <FlatList
            data={data} // 您的数据数组
            renderItem={(abc, dd) => {

              return renderItem(abc)
            }} // 渲染列表项的函数
          />
        </View>
      </View>
    </View>
  );
};

const styles = createStyles({
  headerContainer: {
    paddingLeft: '2%',
  },
  headerText1: {
    color: '#2a2a2a',
    fontFamily: 'pingfanghk-semibold',
    fontWeight: '500',
    fontSize: 16,
  },
  headerText2: {
    color: '#656363',
    paddingTop: 0,
    fontFamily: 'pingfanghk-light',
    fontWeight: '500',
    fontSize: 14,
    paddingTop: 0,
  },
  headerText3: {
    color: '#000',
    fontFamily: fontName.regular,
    fontSize: 14,
  },
  navText: {
    paddingLeft: 15,
    color: '#000',
    fontSize: 15,
    fontFamily: fontName.regular,
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    paddingLeft: '2%',
    paddingRight: '2%',
  },
  navItem: {
    backgroundColor: '#fff',
    width: '48%',
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#f4f4f4',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
    shadowColor: '#888',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  scrollItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#f4f4f4',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 15,
  },
  scrollContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  scroll: {
    marginLeft: '2%',
    marginTop: 15,
    width: '100%',
    flex: 1,
    position: 'relative',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  navBtn: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#e1e1e1',
    borderRadius: 10,
    position: 'relative',
  },
});

export default Home;

import React from 'react';
import ShadowCard from 'src/components/Shadow';
import {createStyles, useInlineStyle} from 'src/helpers/style';
import {View, Text, ScrollView} from 'react-native';
import Card from './card';
import {fontName} from 'src/constants/font';

const RenderItem = props => {
  const item = props.data.item;
  return (
    <ShadowCard style={styles.scrollItem}>
      <View style={styles.scrollContainer}>
        <View style={useInlineStyle({width: 250})}>
          <Text style={styles.itemTitle}>Room #{item.serial_number}</Text>
          <View
            style={useInlineStyle({
              position: 'absolute',
              bottom: 0,
              justifyContent: 'flex-end',
            })}>
            <View style={styles.content}>
              <View>
                <Text
                  style={useInlineStyle({
                    fontFamily: fontName.bold,
                    color: '#000',
                    fontSize: 14,
                    paddingBottom: 5,
                  })}>
                  {item.max}C
                </Text>
                <Text
                  style={useInlineStyle({
                    fontFamily: fontName.medium,
                    color: '#000',
                    fontSize: 10,
                    paddingBottom: 5,
                  })}>
                  Max Current Temperature
                </Text>
              </View>
              <View style={useInlineStyle({marginTop: 5})}>
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
                  Low Current Temperatur
                </Text>
              </View>
            </View>
          </View>
        </View>
        <ScrollView horizontal style={{minHeight: 114.25}}>
          {item.data.map((item2, index) => {
            return (
              <Card
                key={index}
                item={{
                  id: item2.id,
                  title1: item2.name1,
                  title2: item2.date,
                  name: item2.name2,
                  img: item2.img,
                  serial_number: item2.serial_number,
                  cropItemCycle: item2.cropItemCycle,
                }}
              />
            );
          })}
        </ScrollView>
      </View>
    </ShadowCard>
  );
};

const styles = createStyles({
  itemTitle: {
    fontFamily: fontName.medium,
    fontSize: 14,
    color: '#000',
  },
  content: {
    backgroundColor: '#cbfaff',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 15,
    paddingBottom: 10,
  },
});

export default RenderItem;

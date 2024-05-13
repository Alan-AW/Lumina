import React, { useEffect, useState } from 'react';
import {
    Image,
    TouchableOpacity,
} from 'react-native';
import AutoView from 'src/components/AutoView/View';
import RadioIcon from 'src/components/RadioIcon';
import colors from 'src/constants/colors';
import {
    adaptationConvert,
    useInlineStyle,
} from 'src/helpers/style';
import { GetPercent, getMonth } from 'src/helpers/utils';
import LocalesText from 'src/components/Text';
import { locales } from 'src/helpers/localesText';
import NormalText from 'src/components/Text/NormalText';
import CustView from 'src/components/FlexView/CustView';
import Center from 'src/components/FlexView/Center';
import Img from 'src/components/Image';
import MyCustomProgressBar from '../progressBar';
import Start from 'src/components/FlexView/Start';
import AutoText from 'src/components/AutoView/Text';
import { FONT_SIZE } from 'src/constants/style';

interface CardProps {
    onPress: () => void;
    item: any
}
const null_plant_size = 160


const HomeCard = (props: CardProps) => {
    const { cropItemCycle, url, cropItemDay, cropItemName } = props.item;

    return (
        <TouchableOpacity
            onPress={props.onPress}
            activeOpacity={1}
            style={useInlineStyle({
                marginRight: 32,
                position: 'relative',
                zIndex: 6,
            })}>
            {
                cropItemName && <>
                    <AutoText>
                        <LocalesText languageKey={locales.PlantingCycleProgress} style={{ fontSize: FONT_SIZE.desc }} />
                    </AutoText>
                    <AutoText style={{ paddingVertical: 8 }}>
                        <LocalesText languageKey={locales.PlantStart} rightText={` ${cropItemDay}/${cropItemCycle} `} style={{ fontSize: FONT_SIZE.desc }} />
                        <LocalesText languageKey={locales.Day} style={{ fontSize: FONT_SIZE.desc }} />
                    </AutoText>

                    <CustView >
                        <MyCustomProgressBar value={GetPercent(cropItemDay, cropItemCycle)} />
                    </CustView>

                    <NormalText size={28} vertical={10}>
                        {cropItemName}
                    </NormalText>
                </>
            }

            <CustView bgColor='#f6f6f6' style={{marginTop:cropItemName?0:100}}>
                <Center vertical={15} horizontal={30}>
                    {
                        cropItemName ? <Img url={url} size={80} radius={4} /> :
                            <Image source={require('src/asset/img/no-active-cycle-home-icon.png')} style={{ width: adaptationConvert(null_plant_size), height: adaptationConvert(null_plant_size) }} />

                    }

                </Center>
            </CustView>

        </TouchableOpacity>
    );
};

export default HomeCard;
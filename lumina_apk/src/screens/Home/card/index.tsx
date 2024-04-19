import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
} from 'react-native';
import AutoView from 'src/components/AutoView/View';
import RadioIcon from 'src/components/RadioIcon';
import colors from 'src/constants/colors';
import {
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
const HomeCard = (props: CardProps) => {
    const { title1, title2, name, cropItemCycle, serial_number, img, id } = props.item;

    return (
        <TouchableOpacity
            onPress={props.onPress}
            activeOpacity={1}
            style={useInlineStyle({
                marginRight: 32,
                position: 'relative',
                zIndex: 6,
            })}>
            {/* <Start>
                <RadioIcon
                    color={colors.checked}
                    size={10}
                />
                <LocalesText languageKey={locales.Aisle} size={27} color='#000' top={0} left={0} rightText={` #${serial_number}`} />
            </Start> */}
            <AutoText>
                <LocalesText languageKey={locales.PlantingCycleProgress}  style={{fontSize:FONT_SIZE.desc}} />
            </AutoText>
            <AutoText style={{paddingVertical:8}}>
                <LocalesText languageKey={locales.PlantStart} rightText={` ${title2}/${cropItemCycle} `}  style={{fontSize:FONT_SIZE.desc}}/>
                <LocalesText languageKey={locales.Day} style={{fontSize:FONT_SIZE.desc}} />
            </AutoText>

            <CustView >
                <MyCustomProgressBar value={GetPercent(title2, cropItemCycle)} />
            </CustView>

            <NormalText size={28} vertical={10} color='#000'>
                {name}
            </NormalText>
            <CustView bgColor='#f6f6f6'>
                <Center vertical={15} horizontal={30}>
                    <Img url={img} size={80} radius={4} />
                </Center>
            </CustView>

        </TouchableOpacity>
    );
};

export default HomeCard;
import React, { ReactNode } from "react";
import { View, Text } from 'react-native'
import { fontName } from "src/constants/font";
import { adaptationConvert, createStyles } from "src/helpers/style";
import { getMonth } from "src/helpers/utils";
import { useTranslation } from 'react-i18next';
import AutoView from "../AutoView/View";
import ShadowCard from "../Shadow";
import { IconButton } from "../Button";
import { IconJiantouCopy } from "src/iconfont";
import { useNavigation } from '@react-navigation/native'
import colors from "src/constants/colors";

type ScreenHeaderProps = {
    right?: () => ReactNode | null,
    title: string,
    subtitle: string,
    hiddenBack?: boolean,
    otherNode?: () => ReactNode,
}

const ScreenHeader = (props: ScreenHeaderProps) => {
    const { t } = useTranslation();
    const nav = useNavigation()
    return (
        <AutoView style={{ justifyContent: 'space-between', alignItems: 'center' }} isRow>


            <AutoView isRow style={{alignItems:'flex-start'}}>
                {
                    !props.hiddenBack && <ShadowCard style={styles.backBtn}>
                        <IconButton onPress={() => nav.goBack()}>
                            <IconJiantouCopy size={adaptationConvert(30)} />
                        </IconButton>
                    </ShadowCard>
                }
                <View>
                    <Text style={styles.headerText1}>{props.title}
                    </Text>
                    <AutoView style={{ alignItems: 'center',position:'relative', }} isRow>
                        <Text style={styles.headerText2}>
                            {t(getMonth())} {new Date().getDate()},{new Date().getFullYear()}
                        </Text>
                        {
                                props.otherNode ? props.otherNode() : <Text style={styles.headerText3}>{props.subtitle}</Text>
                            }
                    </AutoView>

                </View>


            </AutoView>
            {
                props.right && props.right()
            }

        </AutoView>
    )
}

const styles = createStyles({
    headerContainer: {
    },
    headerText1: {
        color: '#2a2a2a',
        fontWeight: '500',
        fontSize: 40,
        paddingBottom:15,
        fontFamily:fontName.bold,
    },
    headerText2: {
        color: '#656363',
        fontFamily: 'pingfanghk-light',
        fontWeight: '500',
        fontSize: 26,
        lineHeight:30,
        paddingTop: 0,
        paddingRight:12,
        alignItems: 'center',
    },
    headerText3: {
        color: '#000',
        fontFamily: fontName.regular,
        fontSize: 26,
        lineHeight:30,
    },
    backBtn: {
        backgroundColor: '#fff',
        width: 70,
        height: 70,
        borderColor: colors.borderColor,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
    },
})

export default ScreenHeader
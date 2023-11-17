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


            <AutoView isRow>
                {
                    !props.hiddenBack && <ShadowCard style={styles.backBtn} hiddenShadow>
                        <IconButton onPress={() => nav.goBack()}>
                            <IconJiantouCopy size={adaptationConvert(22)} />
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
        fontSize: 32,
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
        width: 50,
        height: 50,
        borderColor: '#f4f4f4',
        borderWidth: 1,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
})

export default ScreenHeader
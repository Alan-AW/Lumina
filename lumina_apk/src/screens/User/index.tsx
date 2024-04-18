import React from "react";
import { Alert, Image, StyleSheet, View } from 'react-native'
import AutoText from "src/components/AutoView/Text";
import AutoView from "src/components/AutoView/View";
import ScreenHeader from "src/components/ScreenHeader";
import ShadowCard from "src/components/Shadow";
import { useAppSelector } from "src/reduxCenter/hooks";
import { fontName } from "src/constants/font";
import { createStyles } from "src/helpers/style";
import { baseUrl } from "src/apis/config";
import LocalesText from "src/components/Text";
import { locales } from "src/helpers/localesText";
import NormalText from "src/components/Text/NormalText";
import { useTranslation } from "react-i18next";
import SpaceBetween from "src/components/FlexView/SpaceBetween";
import Center from "src/components/FlexView/Center";
import { IconButton } from "src/components/Button";
import { useNavigation } from "@react-navigation/native";
import storage from "src/helpers/storage";
import DropdownComponent from "../Setting/SelectLanganug";
import Start from "src/components/FlexView/Start";




const User = () => {
    const state = useAppSelector(state => state.user.userInfo);
    const { t } = useTranslation();
    const navigation: any = useNavigation()

    function logout() {
        Alert.alert(
            t('confirmTitle'),
            '',
            [
                // {text: '自定义按钮', onPress: () => console.log('点击了自定义按钮')},
                {
                    text: t('cancel'),
                    onPress: () => console.log('点击了取消按钮'),
                    style: 'cancel',
                },
                {
                    text: t('confirm'),
                    onPress: () => {
                        storage.remove({
                            key: 'userInfo',
                        });
                        navigation.reset({
                            index: 1,
                            routes: [{ name: 'Login' }],
                        });
                    },
                },
            ],
            { cancelable: false },
        );
    }

    return (
        <AutoView style={{ flex: 1, backgroundColor: '#fffcf7', marginLeft: 16, padding: 32 }}>
            <ScreenHeader title={t('userInfo')} subtitle='' hiddenBack={true} />
            <Center style={{ height: '80%' }}>
                <ShadowCard style={{
                    width: '30%',
                    paddingLeft: 20, paddingRight: 20, paddingBottom: 40
                }}>
                    <View style={styles.item}>
                        <AutoView isRow>
                            <AutoView isRow style={{
                                justifyContent: 'center',
                                overflow: 'hidden', width: 170, height: 170, marginLeft: 0
                            }}>
                                <Image source={{ uri: `${baseUrl + state?.avatar}` }}
                                    style={{ width: 50, height: 50 }} />
                            </AutoView>

                            <AutoView style={{ paddingLeft: 32 }}>
                            <Start>
                                    <AutoText style={{color:'#444'}}>{state.name}</AutoText>
                                </Start>
                              
                            </AutoView>
                        </AutoView>
                    </View>

                    <SpaceBetween style={{ paddingVertical: 50 }}>
                        <LocalesText left={0} languageKey={locales.loginQRCode} />
                        <Image source={{ uri: baseUrl + state.qrcode }} style={{ width: 80, height: 80 }} />
                    </SpaceBetween>
                    <SpaceBetween style={{ paddingVertical: 50 }}>
                        <LocalesText left={0} languageKey={locales.role} />
                        <NormalText text={state.role} left={0} color="#444" />
                    </SpaceBetween>
                    <SpaceBetween style={{ paddingVertical: 50 }}>
                        <LocalesText left={0} languageKey={locales.account} />
                        <NormalText text={state.account} left={0} color="#444" />
                    </SpaceBetween>
                    <SpaceBetween style={{ paddingVertical: 50 }}>
                        <LocalesText left={0} languageKey={locales.company} />
                        <NormalText text={state.company_name} left={0} color="#444" />
                    </SpaceBetween>
                    <SpaceBetween style={{ paddingVertical: 50 }}>
                        <DropdownComponent />
                    </SpaceBetween>
                    <Center style={{ marginTop: 64 }}>
                        <Center onPress={logout} style={{ width: '60%', paddingHorizontal: 32, paddingVertical: 32, backgroundColor: '#e47177', borderRadius: 8 }}>
                            <LocalesText languageKey={locales.logOutOfLogin} color="#fff" isBold />
                        </Center>
                    </Center>
                </ShadowCard>
            </Center>
        </AutoView>
    )
}

const styles = createStyles({
    item: {
        borderBottomWidth: 2,
        borderColor: '#f8f8f8',
        paddingBottom: 50,
        width: '100%',
        marginTop: 50,

    },
    label: {
        fontWeight: '500',
        fontFamily: fontName.bold,
        // lineHeight:48,
        paddingLeft: 64,
        fontSize: 80,

    }
})

export default User
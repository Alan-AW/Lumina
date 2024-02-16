import React from "react";
import { Image, StyleSheet, View } from 'react-native'
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




const User = () => {
    const state = useAppSelector(state => state.user.userInfo);
    const {t}=useTranslation();

    return (
        <AutoView style={{ flex: 1, backgroundColor: '#fff', marginLeft: 16, padding: 32 }}>
            <ScreenHeader title={t('userInfo')} subtitle='' hiddenBack={true} />
            
            <AutoView style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>
                <ShadowCard style={{
                    width: '40%',
                    paddingLeft: 20, paddingRight: 20, paddingBottom: 40
                }}>
                    <View style={styles.item}>
                        <AutoView isRow>
                            <AutoView isRow style={{
                                borderWidth: 1, borderColor: '#f4f4f4', justifyContent: 'center',
                                borderRadius: 100, overflow: 'hidden', width: 170, height: 170, marginLeft: 36
                            }}>
                                <Image source={{ uri: `${baseUrl + state?.avatar}` }}
                                    style={{ width: 50, height: 50, borderRadius: 100 }} />
                            </AutoView>

                            <AutoView style={{ paddingLeft: 32 }}>
                                <AutoView isRow>
                                    <LocalesText languageKey={locales.lastName} />
                                    <NormalText text={state.last_name} left={50} />
                                </AutoView>
                                <AutoView isRow style={{ marginTop: 15 }}>
                                    <LocalesText languageKey={locales.firstName} />
                                    <NormalText text={state.firstName} left={50} />
                                </AutoView>
                            </AutoView>



                        </AutoView>

                    </View>
                    <View style={styles.item}>
                        <AutoView isRow style={{ justifyContent: 'space-between', paddingRight: 32, paddingLeft: 32 }}>
                            <LocalesText left={64} languageKey={locales.loginQRCode} />
                            <Image source={{ uri: baseUrl + state.qrcode }} style={{ width: 100, height: 100 }} />

                        </AutoView>
                    </View>

                    <View style={styles.item}>
                        <AutoView isRow style={{ paddingLeft: 32, alignItems: 'center' }}>
                            <LocalesText left={64} languageKey={locales.role} />
                            <NormalText text={state.role} left={64} />

                        </AutoView>

                    </View>
                    <View style={styles.item}>
                        <AutoView isRow style={{ paddingLeft: 32 }}>
                            <LocalesText left={64} languageKey={locales.account} />
                            <NormalText text={state.account} left={64} />

                        </AutoView>

                    </View>
                    <View style={{ paddingBottom: 50, marginTop: 40 }}>
                        <AutoView isRow style={{ paddingLeft: 32, alignItems: 'center' }}>
                            <LocalesText left={64} languageKey={locales.company} />
                            <NormalText text={state.company_name} left={64} />
                        </AutoView>

                    </View>
                </ShadowCard>

            </AutoView>

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
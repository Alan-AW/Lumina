import React from "react";
import { Image, StyleSheet, View } from 'react-native'
import AutoText from "src/components/AutoView/Text";
import AutoView from "src/components/AutoView/View";
import ScreenHeader from "src/components/ScreenHeader";
import ShadowCard from "src/components/Shadow";
import { useAppSelector } from "src/reduxCenter/hooks";
import { useTranslation } from 'react-i18next';
import { fontName } from "src/constants/font";
import { createStyles } from "src/helpers/style";
import { baseUrl } from "src/apis/config";




const User = () => {
    const state = useAppSelector(state => state.user.userInfo);
    const { t } = useTranslation()

    return (
        <AutoView style={{ flex: 1, backgroundColor: '#fff', marginLeft: 16, padding: 32 }}>
            <ScreenHeader title={t('userInfo')} subtitle='' />
            <AutoView style={{ marginTop: 40 }}>
                <AutoView isRow style={styles.item}>
                    <AutoText>{t('firstName')}:</AutoText>
                    <AutoText style={styles.label}>{state.first_name}</AutoText>
                </AutoView>
                <AutoView isRow style={styles.item}>
                    <AutoText>{t('lastName')}:</AutoText>
                    <AutoText style={styles.label}>{state.last_name}</AutoText>
                </AutoView>
                <AutoView style={styles.item}>
                    <AutoText>{t('loginQRCode')}</AutoText>
                    <Image source={{ uri: baseUrl + state.qrcode }} style={{ width: 100, height: 100 }} />
                </AutoView>
                <AutoView isRow style={styles.item}>
                    <AutoText>{t('role')}:</AutoText>
                    <AutoText style={styles.label}>{state.role}</AutoText>
                </AutoView>
                <AutoView isRow style={styles.item}>
                    <AutoText>{t('account')}:</AutoText>
                    <AutoText style={styles.label}>{state.account}</AutoText>
                </AutoView>
                <AutoView isRow style={styles.item}>
                    <AutoText>{t('company')}:</AutoText>
                    <AutoText style={styles.label}>{state.company_name}</AutoText>
                </AutoView>
            </AutoView>

        </AutoView>
    )
}

const styles = createStyles({
    item: {
        borderBottomWidth: 2,
        borderColor: '#f8f8f8',
        paddingTop: 50,
        paddingBottom: 50
    },
    label: {
        fontWeight: '500',
        fontFamily: fontName.bold,
        // lineHeight:48,
        paddingLeft: 20,

    }
})

export default User
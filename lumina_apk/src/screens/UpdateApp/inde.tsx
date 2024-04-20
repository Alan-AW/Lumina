


import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ToastAndroid, View } from "react-native";
import AutoText from "src/components/AutoView/Text";
import { IconButton } from "src/components/Button";
import Center from "src/components/FlexView/Center";
import Start from "src/components/FlexView/Start";
import Loading from "src/components/Loading";
import Back from "src/components/ScreenHeader/Back";
import colors from "src/constants/colors";
import { APP_VERSION } from "src/constants/global";
import { updateApp } from "src/helpers/utils";
import { updateMenuStatus } from "src/reduxCenter/actionCreators";
import { useAppDispatch } from "src/reduxCenter/hooks";
import { auth_store } from "src/store/authStore";
import RNFS from 'react-native-fs'
import LocalesText from "src/components/Text";
import { locales } from "src/helpers/localesText";
import { useTranslation } from "react-i18next";
import ShadowCard from "src/components/Shadow";
import { FONT_SIZE } from "src/constants/style";


export default function UpdateApp() {

    const route: any = useRoute();
    const { t } = useTranslation();
    const [status, setStatus] = useState('点击下载')
    const [isDownLoad, setIsDownLoad] = useState(false)
    const { update_version, url } = route.params;
    const dispatch = useAppDispatch()

    useEffect(() => {
        const path = `${RNFS.ExternalStorageDirectoryPath}/Download/DLManager`;
        const appVersion = `LuminaOS_${update_version}.apk`

        RNFS.readDir(path).then(res => {
            if (res && Array.isArray(res)) {

                const fileList = res.filter(i => i.isFile() && i.name === appVersion)
                console.log('检查更新', fileList);

                setIsDownLoad(fileList.length > 0)
            }
        }).catch(err => { })

    }, [])


    function update() {
        setStatus('正在下载...')
        updateApp(url, update_version)
       
    }


    return (
        <View style={{ flex: 1, backgroundColor: colors.themeBgColor }}>
            {/* <Start style={{paddingLeft:64,paddingTop:32}}>
                <Back noneText={false} customPress={(nav:any)=>{
                    nav.navigate('Home');
                    dispatch(updateMenuStatus(false))
                }} />
            </Start> */}
            <Center style={{ flex: 1, flexDirection: 'column' }}>
                <View>
                    <AutoText>{t('CurrentVersion')}：<AutoText style={{ color: colors.checked }}>{APP_VERSION}</AutoText></AutoText>

                </View>
                <View style={{marginVertical:16}}>
                    <AutoText>{t("NewVersion")}：<AutoText style={{ color: colors.checked, paddingLeft: 32 }}>{update_version}</AutoText></AutoText>

                </View>

                <IconButton onPress={update}>
                    <ShadowCard style={{ paddingVertical: 16, paddingHorizontal: 24, marginLeft: 16, borderWidth: 1, borderColor: '#f8f8f8' }}>
                        {
                            isDownLoad ? <LocalesText languageKey={locales.Install} style={{ color: colors.checked, fontSize: 45, fontWeight: '700' }} />
                                :
                                <LocalesText languageKey={locales.downLoadApp} style={{ color: '#4a4a4a', fontSize: 45, fontWeight: '600' }} />
                        }
                    </ShadowCard>

                </IconButton>
            </Center>
        </View>


    )
}
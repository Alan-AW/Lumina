


import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ToastAndroid, View } from "react-native";
import AutoText from "src/components/AutoView/Text";
import { IconButton } from "src/components/Button";
import Center from "src/components/FlexView/Center";
import Start from "src/components/FlexView/Start";
import colors from "src/constants/colors";
import { updateApp } from "src/helpers/utils";
import { useAppDispatch } from "src/reduxCenter/hooks";
import RNFS from 'react-native-fs'
import { useTranslation } from "react-i18next";
import ShadowCard from "src/components/Shadow";
import { getAppVersionName } from "src/helpers/app";
import useVersionName from "src/hooks/useVersionName";

const IS_DOWNLOAD = '正在下载...'

export default function UpdateApp() {

    const route: any = useRoute();
    const { t } = useTranslation();
    const [status, setStatus] = useState('点击下载App')
    const [isDownLoad, setIsDownLoad] = useState(false)
    const currentVersionName=useVersionName();
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
        if (!isDownLoad) {
            setStatus(IS_DOWNLOAD)
        }
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
            <Center>
                <Center style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',marginTop:'20%' }}>
                    <View>
                        <AutoText>{t('CurrentVersion')}：<AutoText style={{ color: colors.checked }}>{currentVersionName}</AutoText></AutoText>

                    </View>
                    <Start style={{ marginVertical: 32 }}>
                        <AutoText>{t('NewVersion')}：<AutoText style={{ color: colors.btnRedColor, paddingLeft: 32, paddingRight: 32 }}>{update_version}</AutoText>
                        </AutoText>
                        {/* {isDownLoad && <AutoText style={{ color: colors.checked,paddingLeft:32 }}>已下载</AutoText>} */}
                      
                    </Start>

                    <IconButton onPress={update} disabled={status === IS_DOWNLOAD}>
                        <ShadowCard disabled={status === IS_DOWNLOAD} style={{ paddingVertical: 16, paddingHorizontal: 24, marginLeft: 16, borderWidth: 1, borderColor: '#f8f8f8' }}>
                            {
                                isDownLoad ? <AutoText>{t('Install')}</AutoText>
                                    :
                                    <AutoText>{t('downLoadApp')}</AutoText>
                            }
                        </ShadowCard>

                    </IconButton>
                </Center>
            </Center>

        </View>


    )
}
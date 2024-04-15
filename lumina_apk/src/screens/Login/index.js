import { View, Text, TextInput, Dimensions, Modal, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Container from 'src/components/Container';
import { IconButton, TextButton } from 'src/components/Button';
import { createStyles, useInlineStyle } from 'src/helpers/style';
import ShadowCard from 'src/components/Shadow';
import { IconSaoma, IconWeixinsaoma } from 'src/iconfont';
import { useAppDispatch } from 'src/reduxCenter/hooks';
import { loginIn, loginInSuccess, updateMenuStatus } from 'src/reduxCenter/actionCreators';
import { requestLogin } from 'src/apis/login';
import ToastService from 'src/helpers/toast';
import { useCameraPermission } from 'react-native-vision-camera'
import storage from 'src/helpers/storage';
import { useTranslation } from 'react-i18next';
import { fontName } from 'src/constants/font';
import { locales } from 'src/helpers/localesText';
import WebView from 'react-native-webview';
import { useFetch } from 'src/hooks/useFetch';
import { auth_store } from 'src/store/authStore';



const FormContent = ({ navigation }) => {
    const [passwordType, setPasswordType] = useState('password');
    const [account, setAccount] = useState('xxj')
    const [password, setPassWord] = useState('123456')
    const { run } = useFetch(() => requestLogin({ account, password }))

    const { hasPermission, requestPermission } = useCameraPermission();
    const dispatch = useAppDispatch()
    const { t } = useTranslation();
    function login() {
        run((data) => {
            ToastService.showToast(locales.LoginSuccess)
            auth_store({
                token: data.token,
            })
            dispatch(loginInSuccess(data))
            navigation.reset({
                index: 1,
                routes: [{ name: 'Home' }],
            });
            dispatch(updateMenuStatus(false))
        });


    }
    function qrCode() {
        if (!hasPermission) {
            requestPermission().then(res => {
                navigation.navigate('QrCode')
            })
            return;
        }
        //  navigation.navigate('QrCode')

    }
    return (
        <ShadowCard style={{
            margin: 0,
            elevation: 24,
            width: 400,
            shadowRadius: 24,
            shadowOffset: {
                width: 0,
                height: 8
            },
            shadowColor: 'black',
        }}>
            <View style={styles.content}>
                <Text style={useInlineStyle({ textAlign: 'center', fontSize: 40, fontFamily: fontName.bold, lineHeight: 50, })} >{t('Login')}</Text>
                <TextInput style={styles.item} value={account} onChangeText={text => setAccount(text)} placeholder={t('account')} />
                <TextInput style={styles.item} value={password} textContentType='password' onChangeText={text => setPassWord(text)} secureTextEntry={true} placeholder={t('password')} />
                <View style={styles.qrcode}>
                    <IconButton onPress={() => qrCode()}>
                        <IconSaoma size={26} />
                    </IconButton>

                </View>
                <TextButton style={styles.loginBtn} testStyle={useInlineStyle({ color: '#fff', fontSize: 40 })} onPress={() => login()}>{t('Login')}</TextButton>
            </View>
        </ShadowCard>
    )
}



const Login = (props) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(updateMenuStatus(true))


    }, [])
    const bj = require('./background/index.html')
    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={bj}
                style={{ position: 'absolute', zIndex: 6, top: 0, left: 0, width: '100%', height: '100%', }} />
            <Container style={styles.container}>
                <FormContent navigation={props.navigation} />

            </Container>
        </View>

    )
}

const styles = createStyles({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#rgba(0,0,0,0)'
    },
    content: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 5,
    },
    item: {
        marginTop: 14,
        borderWidth: 1,
        borderRadius: 3,
        padding: 20,
        paddingBottom: 5,
        width: '90%',
        marginLeft: '5%',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8',
        fontSize: 48,
    },
    loginBtn: {
        backgroundColor: '#2a2a2a',
        paddingTop: 24,
        paddingBottom: 24,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop:60,
        width: '60%',
        marginLeft: '20%',
        marginBottom: 20,
    },
    qrcode: {
        justifyContent: 'flex-end',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
    },
})

export default Login
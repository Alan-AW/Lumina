import { View,Text,TextInput,Dimensions,Modal, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Container from 'src/components/Container';
import { IconButton, TextButton } from 'src/components/Button';
import { createStyles, useInlineStyle } from 'src/helpers/style';
import ShadowCard from 'src/components/Shadow';
import { FlexCenter } from 'src/components/FlexView';
import { IconWeixinsaoma } from 'src/iconfont';
import { useAppDispatch } from 'src/reduxCenter/hooks';
import { loginIn, loginInSuccess, updateMenuStatus } from 'src/reduxCenter/actionCreators';
import { requestLogin } from 'src/apis/login';
import ToastService from 'src/helpers/toast';
import {useCameraPermission} from 'react-native-vision-camera'
import storage from 'src/helpers/storage';
import DialogServer from 'src/helpers/modal';
import { useTranslation } from 'react-i18next';

const WINDOW=Dimensions.get('window')


const FormContent=({navigation})=>{
    const [account,setAccount]=useState('test')
    const [password,setPassWord]=useState('test')
    const { hasPermission, requestPermission } = useCameraPermission();
    const dispatch=useAppDispatch()
    const { t } = useTranslation();
    function login(){

       
       
        requestLogin({account,password}).then(res=>{
            if(res && !res.status){
                ToastService.showToast(res.errs)
                return;
            }
            storage.save({
                key:'userInfo',
                data:res.data
            }).then(res=>{
               
            })
            dispatch(loginInSuccess(res.data))
            ToastService.showToast(t("LoginSuccess"))
            navigation.navigate('Home')
            dispatch(updateMenuStatus(false))
      
           
        }).catch(err=>{
            Alert.alert(JSON.stringify(err.message))
           // ToastService.showToast("登录失败")
        })
    }
    function qrCode(){
        if(!hasPermission){
            requestPermission().then(res=>{
                navigation.navigate('QrCode')
            })
            return;
        }
        navigation.navigate('QrCode')
        
    }
    return (
        <ShadowCard style={{
            margin: 0,
            elevation: 24,
            shadowRadius: 24,
            shadowOffset: {
              width: 0,
              height: 8
            },
            shadowColor: 'black',
          }}>
        <View style={styles.content}>
        <Text style={{textAlign:'center'}} >{t('Login')}</Text>
           <TextInput style={styles.item} value={account} onChangeText={text=>setAccount(text)}  placeholder={t('account')} />
           <TextInput style={styles.item} value={password} onChangeText={text=>setPassWord(text)}   secureTextEntry={true}  placeholder={t('password')} />
           <View style={styles.qrcode}>
            <IconButton onPress={()=>qrCode()}>
            <IconWeixinsaoma />
            </IconButton>
           
           </View>
            <TextButton style={styles.loginBtn} testStyle={useInlineStyle({color:'#fff',fontSize:25})} onPress={()=>login()}>{t('Login')}</TextButton>
        </View>
        </ShadowCard>
    )
}



const Login=(props)=>{
    const dispatch=useAppDispatch()
    useEffect(()=>{
        dispatch(updateMenuStatus(true))
    

    },[])
    return (
        <Container style={styles.container}>
          <FormContent navigation={props.navigation} />
   
        </Container>
    )
}

const styles=createStyles({
    container:{
        position:'absolute',
        width:'100%',
        height:'100%',
        left:0,
        top:0,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#fffcf7'
    },
    content:{
        backgroundColor:'#fff',
        padding:24,
        borderRadius:5,
    },
    item:{
        marginTop:14,
        borderWidth:1,
        borderRadius:3,
        padding:10,
        paddingBottom:5,
        width:500,
        borderWidth:0,
        borderBottomWidth:1,
        borderBottomColor:'#e8e8e8',
        fontSize:25,
    },
    loginBtn:{
        backgroundColor:'#2a2a2a',
        paddingTop:15,
        paddingBottom:15,
        borderRadius:5,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        // marginTop:60,
        width:'60%',
        marginLeft:'20%',
        marginBottom:20,
    },
    qrcode: {
        justifyContent:'flex-end',
        display:'flex',
        flexDirection:'row',
        marginTop:10,
      },
})

export default Login
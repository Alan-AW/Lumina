import react from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import ScreenHeader from 'src/components/ScreenHeader';
import ViewContainer from 'src/components/ViewContainer';
import { useTranslation } from 'react-i18next';



const VideoPrew = () => {
  const {t}=useTranslation()
  return (
    <>
      <View style={{position:'relative',zIndex:3,backgroundColor:'rgba(0,0,0,0)',paddingLeft:12,height:40}}>
        <ScreenHeader title={t('videoTitle')} subtitle='' hiddenBack />


      </View>
      <WebView
        source={{ uri: 'https://txc-hls-ipc-nj.tplinkcloud.com.cn/social/tplink/showPage.html?shareId=ce5fba7803da487c800898633dcdb839&platform=wechat' }}
        style={{ position: 'absolute', zIndex: 6,top:-40,left:0,width:'98%',height:'100%',marginLeft:'1%'}} />
    </>

  );
};

export default VideoPrew;

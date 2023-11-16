import react from 'react';
import {View, Text} from 'react-native';
import { WebView } from 'react-native-webview';



const VideoPrew = () => {
  return (
    <WebView source={{ uri: 'https://txc-hls-ipc-nj.tplinkcloud.com.cn/social/tplink/showPage.html?shareId=80b618bd1b104e98b6b94f8b123f5088&platform=wechat' }} style={{ flex: 1 }} />
  );
};

export default VideoPrew;

import React from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import Video from "react-native-video";
import AutoView from "src/components/AutoView/View";
import FadeModal from "src/components/FadeModal";
import Center from "src/components/FlexView/Center";
import { locales } from "src/helpers/localesText";
import { adaptationConvert } from "src/helpers/style";
import ToastService from "src/helpers/toast";
import { Icon4Guanbi2 } from "src/iconfont";

const closeIconSize=180;

class ShowLiveVideo extends React.PureComponent<any> {
    modalRef: any;
    constructor(props: any) {
        super(props);
        this.state = {

        }
        this.modalRef=React.createRef<any>();
    }

   



    render(): React.ReactNode {
        const {uri,onClose}=this.props;
        
        return (
            <FadeModal ref={this.modalRef} onCloseCallback={onClose}>
                <AutoView style={{width:'90%',height:'75%',position:'relative',borderRadius:20,overflow:'hidden' }}>
                <Video
                    source={{ uri:uri }}
                    style={{width:'100%',height:'100%',position:'relative',zIndex:15,borderRadius:10,backgroundColor:'#ccc' }} resizeMode='contain'
                    onLoad={(e => {
                        console.log(e, 1233);
                    })}
                    onLoadStart={(v => {
                        console.log(v, 'onLoad start');
                    })}
                    onError={(err => {
                        ToastService.showToast(locales.playbackFailed)
                    })}
                />
                <Center onPress={()=>this.props.onClose()} style={{position:'absolute',right:'-4%',
                borderRadius:50,
                    backgroundColor:'#fff',zIndex:16,width:adaptationConvert(closeIconSize),height:adaptationConvert(closeIconSize)}}>
                    <Icon4Guanbi2 size={closeIconSize/10} />
                </Center>
                </AutoView>
             
            </FadeModal>
        );
    }
}

export default ShowLiveVideo;
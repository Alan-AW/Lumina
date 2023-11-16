import React from 'react';
import {Modal, View, TouchableOpacity, Dimensions} from 'react-native';
import {createStyles} from 'src/helpers/style';

const WINDOW = Dimensions.get('window');

interface UseModalProps {
  onCancel?: Function;
}
interface MyComponentState {
  visible: boolean;
  node: any;
  isMask: boolean;
  isMaskClickClose: boolean;
  maskBackgroundColor:string;
  
}
interface shopProps {
  node: any;
  isMask: boolean;
  maskBackgroundColor?:string;
  isMaskClickClose: boolean;
}

class UseModal extends React.Component<UseModalProps, MyComponentState> {
  constructor(props: UseModalProps) {
    super(props);
    this.state = {
      visible: false,
      node: null,
      isMask: true,
      isMaskClickClose:true,
      maskBackgroundColor:'rgba(0,0,0,0.6)',
    };
  }

  openModal = () => {
    if(this.state.isMaskClickClose){
      this.setState({visible: !this.state.visible});
    }
  
  };
  closeModal = () => {
    this.setState({visible: !this.state.visible});
  }

  showModal = (data: shopProps) => {
    const {node, isMask,isMaskClickClose} = data;
    this.setState({
      visible: true,
      node,
      maskBackgroundColor:data.maskBackgroundColor || 'rgba(0,0,0,0.6)',
      isMask: typeof isMask === 'undefined' ? this.state.isMask : isMask,
      isMaskClickClose:typeof isMaskClickClose==='undefined'?true:isMaskClickClose
    });
  };

  MaskNode = () => {
    return (
      <TouchableOpacity
        style={[styles.mask,{backgroundColor:this.state.maskBackgroundColor}]}
        onPress={this.openModal}
        activeOpacity={1}
      />
    );
  };

  render() {
    const {visible, node, isMask} = this.state;
    return (
      <Modal
        visible={visible}
        transparent
        onRequestClose={this.closeModal}
        animationType="fade">
        <View style={styles.container}>
          {isMask && <this.MaskNode />}
          <View style={styles.content}>{node}</View>
        </View>
      </Modal>
    );
  }
}

const styles = createStyles({
  mask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 89,
  },
  container: {
    position: 'relative',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  content: {
    position: 'relative',
    zIndex: 99,
  },
});

export default UseModal;

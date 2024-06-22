import React, { Component, createRef } from 'react';
import {
  Animated,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import Center from '../FlexView/Center';

type Attr = {
  defaultOpen?: boolean;
  children: any;
  onCloseCallback?: Function;
};

class FadeModal extends Component<Attr> {
  opacityValue: Animated.Value;
  state: { show: boolean };

  constructor(props: Attr) {
    super(props);
    this.state = {
      show: false,
    };
    this.opacityValue = new Animated.Value(0);
    this.onRequestClose = this.onRequestClose.bind(this);
    this.open = this.open.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.open();
    }, 100);
  }

  componentWillUnmount() {
    this.onRequestClose();
  }

  open() {
    this.setState({ show: true });
    Animated.timing(this.opacityValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  onRequestClose() {
    Animated.timing(this.opacityValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ show: false });
      if (this.props.onCloseCallback) {
        this.props.onCloseCallback();
      }
    });
  }

  render() {
    const { children } = this.props;
    const { show } = this.state;
    console.log('我正在渲染函数');


    return (
      <SafeAreaView>
        <Modal
          visible={show}
          animationType="fade"
          transparent
          statusBarTranslucent={true}
          style={{ position: 'relative', flex: 1, zIndex: 999999 }}
          onRequestClose={this.onRequestClose}
        >
          <Animated.View
            style={[
              {
                width: '100%',
                height: '100%',
                justifyContent: 'center',
              },
              { opacity: this.opacityValue },
            ]}
          >
            <Center style={{ flex: 1 }}>
              <TouchableOpacity
                activeOpacity={0}
                onPress={() => {
                  console.log('关闭');

                  this.onRequestClose()
                }}
                style={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  flex: 1,
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  zIndex: 8,
                  width: '100%',
                  height: '100%',
                }}
              />
              <Center
                style={{
                  position: 'relative',
                  zIndex: 9,
                }}
              >
                {children}

              </Center>
            </Center>


          </Animated.View>
        </Modal>
      </SafeAreaView>

    );
  }
}

export default FadeModal

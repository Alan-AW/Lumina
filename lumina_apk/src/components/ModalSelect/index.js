import React, { PureComponent } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { createStyles, useInlineStyle } from "src/helpers/style";

const WINDOW = Dimensions.get('screen');

class ModalSelect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  handleChange = (index, item) => {
    this.props.change(index, item);
    this.openModal();
  };

  openModal = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    const { show } = this.state;
    const { title, data = [] } = this.props;
    return (
      <Modal visible={show} animationType="fade" transparent onRequestClose={this.openModal}>
        <TouchableOpacity style={styles.mask} onPress={this.openModal} activeOpacity={1} />
        <View style={styles.contentBox}>
          {/* <View style={{ height: 30 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "500",
                color: "#000",
              }}
            >
              {title}
            </Text>
          </View> */}

          {data.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{ width: "100%",paddingBottom:24}}
                onPress={() => this.handleChange(index, item)}
              >
                <Text style={useInlineStyle({ paddingTop: 16, color: '#000', fontSize:36 })}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Modal>
    );
  }
}

const styles = createStyles({
  searchTypeGroup: {
    flexDirection: "row",
    marginBottom: 10,
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 0,
    paddingTop: 16,
  },
  btnBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: 10,
    width: "100%",
    height: 30,
    position: "absolute",
    bottom: 25,
    left: "10%",
  },
  contentBox: {
    backgroundColor: "#fff",
    width: "80%",
    marginLeft: "10%",
    borderRadius: 2,
    padding:32,
    marginTop: "20%",
    position: "relative",
    zIndex: 6,
    borderRadius:10,
  },
  mask: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    position: "absolute",
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
});

export default ModalSelect;

import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import colors from 'src/constants/colors';
import {createStyles} from 'src/helpers/style';
import AutoText from '../AutoView/Text';
import AutoView from '../AutoView/View';

const activeColor = colors.checked;
const defaultColor = '#eaeaea';

const activeTextColor = '#fff';
const defaultTextColor = '#313131';

class TouchBtnGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectItem: props.defaultIndex,
    };
  }

  handleSelect = index => {
    this.setState({
      selectItem: index,
    });
  };

  render() {
    const {data} = this.props;
    const {selectItem} = this.state;
    return (
      <>
        {data.map((item, index) => {
          return (
            <AutoView
              key={index}
              onPress={() => this.handleSelect(index)}
              style={{
                ...styles.btnDefault,
                backgroundColor:
                  selectItem === index ? activeColor : defaultColor,
              }}>
              <AutoText
                style={{
                  ...styles.textDefault,
                  color:
                    selectItem === index ? activeTextColor : defaultTextColor,
                }}>
                {item}
              </AutoText>
            </AutoView>
          );
        })}
      </>
    );
  }
}

const styles = createStyles({
  btnDefault: {
    marginLeft: 32,
    paddingLeft:30,
    paddingRight:30,
    borderRadius:10,
    paddingTop:10,
    paddingBottom:10,

  
  },
  textDefault: {
    fontSize: 50,
    textAlign: 'center',
  },
});

export default TouchBtnGroup;
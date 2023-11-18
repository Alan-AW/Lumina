import * as React from 'react';
import {Switch, SwitchProps} from 'react-native';
import {useInlineStyle} from 'src/helpers/style';

type SwitchViewProps = {
  onChange?: (v: boolean) => void;
  defaultValue?: boolean;
};

const SwitchView = (props: SwitchViewProps & SwitchProps) => {
  const [isChecked, setIsChecked] = React.useState(false);
  const defaultStyle = {
    transform: [{scaleX: 0.7}, {scaleY: 0.7}],
  };
  const style: any = props.style || {};
  
  return (
    <Switch
      value={isChecked}
      style={[useInlineStyle(style), useInlineStyle(defaultStyle)]}
      thumbColor={isChecked ? '#fff' : '#757575'}
      trackColor={{false: '#e1e1e1', true: '#a5ce77'}}
      onChange={v => {
        setIsChecked(!isChecked);
      }}
    />
  );
};

export default SwitchView;

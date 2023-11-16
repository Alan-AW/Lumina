/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconJiantouCopy: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M671.807 927.804l-415.632-415.804 415.632-415.803 63.445 63.616-352.017 352.209 352.017 352.102z"
        fill={getIconColor(color, 0, '#272636')}
      />
    </Svg>
  );
};

IconJiantouCopy.defaultProps = {
  size: 18,
};

IconJiantouCopy = React.memo ? React.memo(IconJiantouCopy) : IconJiantouCopy;

export default IconJiantouCopy;
